import emailVerificationLink from "@/emailTemplates/emailVerificationLink";
import connectDB from "@/lib/db";
import { generateOTP } from "@/lib/requestHelper";
import sendMail from "@/lib/sendMail";
import zodSchema from "@/lib/zodSchema";
import OTP from "@/models/otp.model";
import User from "@/models/user.model";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(request: Request) {
  try {
    await connectDB();
    const payload = await request.json();

    // schema to adhere while logging in
    const validationSchema = zodSchema
      .pick({
        email: true,
      })
      .extend({
        password: z.string(),
      });

    //to check if the data follows the validation schema
    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return NextResponse.json({
        success: false,
        statusCode: 401,
        message: "Invlid or Missing Input Field",
        data: {},
      });
    }

    const { email, password } = validatedData.data;

    //get user data
    const getUser = await User.findOne({ email });

    if (!getUser) {
      return NextResponse.json({
        success: false,
        statusCode: 404,
        message: "Invalid Login Credentials",
        data: {},
      });
    }

    //resend EmailVerificaation Link
    if (!getUser.isEmailVerified) {
      const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
      console.log("\nJWT SECRET : ", SECRET);

      const token = await new SignJWT({ userId: getUser._id })
        // { userId: newUser._id } is the payload of the JWT — the data encoded inside the token.
        .setIssuedAt()
        //Sets the "iat" (Issued At) claim to the current timestamp. This helps track when the token was generated.
        .setExpirationTime("1hr")
        //Sets the "exp" (Expiration Time) claim
        .setProtectedHeader({ alg: "HS256" })
        //🔹 Sets the JWT header, which includes metadata about how the token is signed.
        //🔹 { alg: "HS256" } means the token is signed using HMAC SHA-256 (symmetric encryption). It needs a secret key to both sign and verify.
        .sign(SECRET);
      //This signs the token using the given secret and returns the final JWT string (which you’ll usually send to the frontend or store in a cookie).

      await sendMail(
        "Email Verification request from Adarsh Thakare",
        email,
        emailVerificationLink(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`
        )
      );
      return NextResponse.json({
        success: false,
        statusCode: 404,
        message:
          "Your email is not verified. We have sent a verification link to your registered email address. Kindly approve the email request to login.",
        data: {},
      });
    }

    //Password Verification
    const isPasswordVerified = await getUser.comparePassword(password);

    if (!isPasswordVerified) {
      return NextResponse.json({
        success: false,
        statusCode: 404,
        message: "Invalid Login Credentials",
        data: {},
      });
    }

    //otp generation
    await OTP.deleteMany({ email }); //to delete all the prior OTPs if tried creating multiple OTPs

    const otp = generateOTP();

    const newOtpData = await new OTP({
      email,
      otp,
    });

    console.log("\nThe OTP is : ", newOtpData);

    // TODO Send Email to send the OTP to the user

    await newOtpData.save();
    return NextResponse.json({
      success: true,
      statusCode: 201,
      message: "User Logged In Successfully! :)",
      data: getUser,
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
