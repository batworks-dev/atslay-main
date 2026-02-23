import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency, productId, buyerDetails } = body;

    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid amount provided" },
        { status: 400 }
      );
    }

    if (!currency) {
      return NextResponse.json(
        { success: false, message: "Currency is required" },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(numericAmount * 100),
      currency,
      receipt: `order_rcpt_${Date.now()}`,
      notes: {
        productId,
        buyer: buyerDetails?.email || "guest",
      },
    });

    const client = await clientPromise;
    const db = client.db("main");
    const ordersCollection = db.collection("orders");

    const orderData = {
      razorpay_order_id: order.id,
      amount: numericAmount,
      currency: order.currency,
      status: "pending",
      productId: productId || null,
      buyerDetails: buyerDetails || {},
      verified: false,
      createdAt: new Date(),
    };

    await ordersCollection.insertOne(orderData);

    return NextResponse.json({
      success: true,
      razorpayOrderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { success: false, message: "Error creating Razorpay order" },
      { status: 500 }
    );
  }
}
