import connectDB from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Logout Successful!",
      data: {},
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message:
        typeof err === "object" && err !== null && "message" in err
          ? err.message
          : String(err),
    });
  }
}
