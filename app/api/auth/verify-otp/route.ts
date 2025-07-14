import connectDB from "@/lib/db";
import zodSchema from "@/lib/zodSchema";
import OTP from "@/models/otp.model";
import User from "@/models/user.model";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { payload } = await request.json();

    const validationSchema = zodSchema.pick({
      otp: true,
      email: true,
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

    const { email, otp } = validatedData.data;

    const getOtpData = await OTP.findOne({ email, otp });

    if (!getOtpData) {
      return NextResponse.json({
        success: false,
        statusCode: 404,
        message: "Invalid or Expired OTP Credentials",
        data: {},
      });
    }

    const getUser = (await User.findOne({ deletedAt: null, email }).lean()) as {
      _id: string;
      role?: string;
      name?: string;
      avatar?: string;
    } | null;
    if (!getUser) {
      return NextResponse.json({
        success: false,
        statusCode: 404,
        message: "User Not found",
        data: {},
      });
    }

    const loggedInUserData = {
      _id: getUser._id,
      role: getUser.role,
      name: getUser.name,
      avatar: getUser.avatar,
    };

    const SECRET = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT(loggedInUserData)
      .setIssuedAt()
      .setExpirationTime("24hr")
      .setProtectedHeader({ alg: "HS256" })
      .sign(SECRET);

    const cookieStore = await cookies();

    cookieStore.set({
      name: "access_token",
      value: token,
      httpOnly: process.env.NODE_ENV === "production",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    //Remove OTP after verification successful
    await getOtpData.deleteOne();

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "OTP Verified Sucessfully.",
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
