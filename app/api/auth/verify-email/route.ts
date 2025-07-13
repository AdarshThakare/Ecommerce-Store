import connectDB from "@/lib/db";
import User from "@/models/user.model";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({
        success: false,
        statusCode: 400,
        message: "Token not found.",
        data: {},
      });
    }

    const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
    const decodedToken = await jwtVerify(token, SECRET);

    const userId = decodedToken.payload.userId;

    //get the User from userId
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        success: false,
        statusCode: 400,
        message: "User not present in the token.",
        data: {},
      });
    }

    user.isEmailVerified = true;
    await user.save();

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "User has been successfully extracted from the JWT token.",
      data: user,
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
