import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // ✅ Corrected import

export async function GET(req: Request) {
  try {
    // ✅ Get logged-in user session (App Router compatible)
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    const client = await clientPromise;
    const db = client.db("main");

    // ✅ Fetch all verified orders for the logged-in user
    const orders = await db
      .collection("orders")
      .find({
        "buyerDetails.email": userEmail,
        verified: true,
        status: "paid",
      })
      .sort({ createdAt: -1 })
      .toArray();

    if (!orders.length) {
      return NextResponse.json({
        success: true,
        products: [],
        message: "No purchased products found.",
      });
    }

    // ✅ Extract valid product IDs
    const productIds = [
      ...new Set(
        orders
          .map((order) => order.productId)
          .filter((id) => id && ObjectId.isValid(id))
      ),
    ];

    // ✅ Fetch corresponding product documents
    const products = await db
      .collection("products")
      .find({
        _id: { $in: productIds.map((id) => new ObjectId(id)) },
      })
      .toArray();

    // ✅ Merge product + order data
    const enrichedProducts = products.map((product) => {
      const productOrders = orders.filter(
        (order) => order.productId === product._id.toString()
      );

      const latestOrder = productOrders[0];

      return {
        ...product,
        _id: product._id.toString(),
        purchaseDate: latestOrder?.createdAt ?? null,
        orderId: latestOrder?._id?.toString() ?? null,
        razorpayOrderId: latestOrder?.razorpay_order_id ?? null,
        razorpayPaymentId: latestOrder?.razorpay_payment_id ?? null,
        razorpaySignature: latestOrder?.razorpay_signature ?? null,
        amountPaid: latestOrder?.amount ?? 0,
        currency: latestOrder?.currency ?? "INR",
        purchaseCount: productOrders.length,
      };
    });

    return NextResponse.json({
      success: true,
      products: enrichedProducts,
      totalOrders: orders.length,
      uniqueProducts: enrichedProducts.length,
    });
  } catch (error) {
    console.error("❌ Error fetching user products:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching your products" },
      { status: 500 }
    );
  }
}
