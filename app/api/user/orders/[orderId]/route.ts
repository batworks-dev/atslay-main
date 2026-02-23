import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const GST_RATE = 0.18;

export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    // 🔐 Auth check
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🆔 Validate orderId
    const { orderId } = params;
    if (!orderId || !ObjectId.isValid(orderId)) {
      return NextResponse.json(
        { success: false, error: "Invalid orderId" },
        { status: 400 }
      );
    }

    // 🗄️ DB connection
    const client = await clientPromise;
    const db = client.db("main");

    // 📦 Fetch order (source of truth)
    const order = await db.collection("orders").findOne({
      _id: new ObjectId(orderId),
      "buyerDetails.email": userEmail,
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // 🛍️ Fetch product only for display
    let product = null;
    if (order.productId && ObjectId.isValid(order.productId)) {
      product = await db.collection("products").findOne({
        _id: new ObjectId(order.productId),
      });
    }

    // 💰 GST calculations (amount is inclusive)
    const totalAmount = Number(order.amount ?? 0);
    const basePrice = Number((totalAmount / (1 + GST_RATE)).toFixed(2));
    const gstAmount = Number((totalAmount - basePrice).toFixed(2));

    // 📤 Final response
    const response = {
      _id: order._id.toString(),
      orderId: order._id.toString(),
      productId: order.productId ?? null,

      productName: product?.name ?? "Unknown Product",
      productImage: product?.image ?? "/placeholder.svg",

      // ✅ Correct pricing breakdown
      price: basePrice,            // exclusive of GST
      gstRate: "18%",
      gstAmount: gstAmount,
      totalAmount: totalAmount,    // inclusive of GST
      currency: order.currency ?? "INR",

      status:
        order.status?.toLowerCase() === "paid"
          ? "Delivered"
          : order.status ?? "Processing",

      createdAt:
        order.createdAt instanceof Date
          ? order.createdAt.toISOString()
          : order.createdAt,

      paymentMethod: "Razorpay",
      transactionId: order.razorpay_payment_id ?? "N/A",
      razorpayOrderId: order.razorpay_order_id ?? "N/A",
      razorpaySignature: order.razorpay_signature ?? "N/A",

      buyerDetails: order.buyerDetails ?? {},
    };

    return NextResponse.json({ success: true, order: response });
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
