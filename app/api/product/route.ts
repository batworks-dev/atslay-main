import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("main")

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const sortBy = searchParams.get('sort')

    let sortOptions: any = { featured: -1 }
    if (sortBy === 'recent') { 
      sortOptions = { _id: -1 }
    }

    let query = db
      .collection("products")
      .find({})
      .sort(sortOptions)

    if (limit) {
      const limitNumber = parseInt(limit, 10);
      if (!isNaN(limitNumber)) {
        query = query.limit(limitNumber);
      }
    }

    const products = await query.toArray()

    return NextResponse.json(JSON.parse(JSON.stringify(products)))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 })
  }
}
