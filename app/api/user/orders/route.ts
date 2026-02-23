import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  console.log("🟢 [API HIT] /api/user/orders/[orderId]");
  console.log("Params received:", params);

  try {
    const session = await getServerSession(authOptions);
    console.log("🔑 Session:", session?.user?.email);

    if (!session || !session.user?.email) {
      console.log("🚫 Unauthorized: No session");
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { orderId } = params;
    const userEmail = session.user.email;

    const client = await clientPromise;
    const db = client.db("main");

    // Log before DB lookup
    console.log("🔎 Looking for order:", orderId, "for user:", userEmail);

    let objectId;
    try {
      objectId = new ObjectId(orderId);
    } catch (err) {
      console.error("❌ Invalid ObjectId:", err);
      return NextResponse.json(
        { success: false, error: "Invalid orderId format" },
        { status: 400 }
      );
    }

    const order = await db.collection("orders").findOne({
      _id: objectId,
      "buyerDetails.email": userEmail,
    });

    console.log("🧾 Order fetched:", order ? "Found ✅" : "Not found ❌");

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    let product = null;
    if (order.productId && ObjectId.isValid(order.productId)) {
      product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(order.productId) });
      console.log("🛍️ Product found:", !!product);
    } else {
      console.log("⚠️ Skipping product fetch — invalid or missing productId");
    }

    const response = {
      _id: order._id.toString(),
      orderId: order._id.toString(),
      productId: order.productId,
      productName: product?.name ?? "Unknown Product",
      productImage: product?.image ?? "/placeholder.svg",
      price: product?.main_price ?? 0,
      currency: product?.currency ?? "INR",
      status:
        order.status === "paid" ? "Delivered" : order.status ?? "Processing",
      createdAt: order.createdAt,
      paymentMethod: "Razorpay",
      transactionId: order.razorpay_payment_id ?? "N/A",
      razorpayOrderId: order.razorpay_order_id ?? "N/A",
      razorpaySignature: order.razorpay_signature ?? "N/A",
      buyerDetails: order.buyerDetails ?? {},
    };

    console.log("✅ Final response:", response);
    return NextResponse.json({ success: true, order: response });
  } catch (error) {
    console.error("🔥 API Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
