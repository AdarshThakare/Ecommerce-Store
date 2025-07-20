import connectDB from "@/lib/db";
import zodSchema from "@/lib/zodSchema";
import OTP from "@/models/otp.model";
import User from "@/models/user.model";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    await connectDB();
    const payload = await request.json();

    const validationSchema = zodSchema.pick({
      email: true,
      password: true,
    });

    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
      return NextResponse.json({
        success: false,
        statusCode: 401,
        message: "Invalid or missing Input fields",
        data: validatedData,
      });
    }

    const { email, password } = validatedData.data;

    const getUser = await User.findOne({ deletedAt: null, email }).select(
      "+password"
    );

    if (!getUser) {
      return NextResponse.json({
        success: false,
        statusCode: 404,
        message: "User Not found",
        data: {},
      });
    }

    getUser.password = password;
    await getUser.save();

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Password has been updated Sucessfully.",
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
