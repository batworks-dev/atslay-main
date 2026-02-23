import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";

/**
 * Verifies Razorpay payment (PRODUCTION SAFE)
 * - Idempotent
 * - MongoDB safe (NO findOneAndUpdate().value)
 * - TypeScript safe (NO ts18047)
 * - Retry safe
 * - Never false-fails when DB update succeeds
 */
export async function POST(req: NextRequest) {
  console.log("🚀 [VERIFY-PAYMENT] API HIT");

  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
      productId,
      buyerDetails,
      amount,
      currency,
    } = body;

    console.log("📥 [REQUEST DATA]", {
      razorpay_order_id,
      razorpay_payment_id,
      orderId,
      productId,
      buyerEmail: buyerDetails?.email,
    });

    /* ----------------------------------
       1️⃣ Validate input
    ---------------------------------- */
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error("❌ [VALIDATION FAILED]", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature_present: !!razorpay_signature,
      });

      return NextResponse.json(
        { success: false, message: "Missing payment details" },
        { status: 400 }
      );
    }

    /* ----------------------------------
       2️⃣ Verify Razorpay signature
    ---------------------------------- */
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isAuthentic = generatedSignature === razorpay_signature;

    console.log("🔐 [SIGNATURE CHECK]", {
      razorpay_order_id,
      isAuthentic,
    });

    const client = await clientPromise;
    const db = client.db("main");
    const ordersCollection = db.collection("orders");

    /* ----------------------------------
       3️⃣ Invalid signature → mark failed
    ---------------------------------- */
    if (!isAuthentic) {
      console.error("❌ [SIGNATURE INVALID]", {
        razorpay_order_id,
        razorpay_payment_id,
      });

      await ordersCollection.updateOne(
        { razorpay_order_id },
        {
          $set: {
            status: "failed",
            verified: false,
            updatedAt: new Date(),
          },
        }
      );

      return NextResponse.json(
        { success: false, message: "Invalid payment signature" },
        { status: 400 }
      );
    }

    /* ----------------------------------
       4️⃣ UPSERT order as PAID (WRITE ONLY)
    ---------------------------------- */
    console.log("💾 [DB UPSERT] Marking order as PAID", {
      razorpay_order_id,
    });

    await ordersCollection.updateOne(
      { razorpay_order_id },
      {
        $set: {
          razorpay_payment_id,
          razorpay_signature,
          status: "paid",
          verified: true,
          productId,
          orderId: orderId ?? null,
          buyerDetails: {
            name: buyerDetails?.name ?? null,
            email: buyerDetails?.email ?? null,
            phone: buyerDetails?.phone ?? null,
          },
          updatedAt: new Date(),
        },
        $setOnInsert: {
          razorpay_order_id,
          amount: amount ?? null,
          currency: currency ?? "INR",
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    /* ----------------------------------
       5️⃣ READ AFTER WRITE (SAFE)
    ---------------------------------- */
    const order = await ordersCollection.findOne({ razorpay_order_id });

    if (!order) {
      console.error("❌ [CRITICAL] Order missing AFTER successful upsert", {
        razorpay_order_id,
      });

      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 500 }
      );
    }

    console.log("✅ [PAYMENT VERIFIED SUCCESSFULLY]", {
      orderId: order._id,
      razorpay_order_id,
      razorpay_payment_id,
      status: order.status,
    });

    /* ----------------------------------
       6️⃣ Send confirmation email (NON BLOCKING)
    ---------------------------------- */
    try {
      console.log("📧 [EMAIL] Sending order confirmation", {
        razorpay_order_id,
        to: buyerDetails?.email,
      });

      await fetch("https://api.batworks.in/verify-payment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          orderId,
          productId,
          buyerDetails,
          messageType: "order_success",
        }),
      });

      console.log("📨 [EMAIL SENT SUCCESS]");
    } catch (mailError) {
      console.error("⚠️ [EMAIL FAILED – NON BLOCKING]", {
        razorpay_order_id,
        error: mailError,
      });
    }

    /* ----------------------------------
       7️⃣ Final response (ALWAYS SUCCESS)
    ---------------------------------- */
    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      order,
    });

  } catch (error) {
    console.error("🔥 [VERIFY-PAYMENT FATAL ERROR]", error);

    return NextResponse.json(
      { success: false, message: "Server error during payment verification" },
      { status: 500 }
    );
  }
}
