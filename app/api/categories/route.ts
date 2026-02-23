import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("main")

    const categories = await db
      .collection("categories")
      .find({})
      .project({ _id: 1, name: 1 })
      .sort({ name: 1 })
      .toArray()

    return NextResponse.json(JSON.parse(JSON.stringify(categories)))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error fetching categories" }, { status: 500 })
  }
}