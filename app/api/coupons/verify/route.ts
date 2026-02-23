import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    if (!code) return NextResponse.json({ valid: false, message: "Missing code" });

    const client = await clientPromise;
    const db = client.db("main");
    const coupon = await db.collection("coupons").findOne({ code: code.toUpperCase() });

    if (!coupon)
      return NextResponse.json({ valid: false, message: "Invalid coupon" });

    const now = new Date();
    if (coupon.expiry && new Date(coupon.expiry) < now)
      return NextResponse.json({ valid: false, message: "Coupon expired" });

    return NextResponse.json({
      valid: true,
      discount: coupon.discount || 10,
    });
  } catch (error) {
    console.error("Coupon verify error:", error);
    return NextResponse.json({ valid: false, message: "Server error" });
  }
}
