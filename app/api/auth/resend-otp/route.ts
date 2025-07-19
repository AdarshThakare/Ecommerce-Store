import { otpEmail } from "@/emailTemplates/emailOtpVerification";
import connectDB from "@/lib/db";
import { generateOTP } from "@/lib/requestHelper";
import sendMail from "@/lib/sendMail";
import zodSchema from "@/lib/zodSchema";
import OTP from "@/models/otp.model";
import User from "@/models/user.model";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();
    const payload = await request.json();

    const validationSchema = zodSchema.pick({
      email: true,
    });

    const validatedData = validationSchema.safeParse(payload);
    console.log("Payload : ", payload);
    if (!validatedData.success) {
      return NextResponse.json({
        success: false,
        statusCode: 401,
        message: "Invalid or missing Input fields",
        data: validatedData,
      });
    }

    const { email } = validatedData.data;

    const getUser = await OTP.findOne({ email });

    if (!getUser) {
      return NextResponse.json({
        success: false,
        statusCode: 404,
        message: "User Not Found",
        data: {},
      });
    }

    //remove all the old otps
    await OTP.deleteMany({ email });

    const otp = generateOTP();

    const newOtpData = new OTP({
      email,
      otp,
    });

    newOtpData.save();

    // sendMail( <SUBJECT>, <EMAIL> , <HTML_TEMPLATE>)
    const otpSendStatus = await sendMail(
      "Your login verification code",
      email,
      otpEmail(otp)
    );

    if (!otpSendStatus) {
      return NextResponse.json({
        success: false,
        statusCode: 404,
        message: "Failed to Resend OTP",
        data: {},
      });
    }

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "OTP resent successfully.",
      data: newOtpData,
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
