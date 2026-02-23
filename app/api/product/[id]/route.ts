import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("main")

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    const product = await db.collection("products").findOne({ // Correct collection name
      _id: new ObjectId(params.id),
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(JSON.parse(JSON.stringify(product)))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error fetching product" }, { status: 500 })
  }
}
