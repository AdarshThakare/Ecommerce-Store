import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";

export async function GET() {
  try {
    const connection = await connectDB();

    if (!connection) {
      return NextResponse.json({
        success: false,
        error: "Database connection failed",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Connected to database successfully :)",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: err.message,
      error: "INTERNAL SERVER ERROR to Connect to database",
    });
  }
}
