import zodSchema from "../../../../lib/zodSchema";
import connectDB from "../../../../lib/db";
import { NextResponse } from "next/server";
import User from "../../../../models/user.model";
import { TextEncoder } from "util";
import { SignJWT } from "jose";
import sendMail from "../../../../lib/sendMail";
import emailVerificationLink from "../../../../emailTemplates/emailVerificationLink";
import { catchError } from "../../../../lib/requestHelper";

export async function POST(request) {
  try {
    await connectDB();

    // validation schema
    const validationSchema = zodSchema.pick({
      name: true,
      email: true,
      password: true,
    });

    const payload = await request.json();
    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return NextResponse.json({
        success: false,
        statusCode: 401,
        message: "Invlid or Missing Input Field",
        data: {},
      });
    }

    const { name, email, password } = validatedData.data;

    //if user already exists
    const existingUser = await User.exists({ email });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        statusCode: 409,
        message: "User Already Exists!",
        data: {},
      });
    }

    // to register new user
    const newUser = await User({
      name,
      email,
      password,
    });

    await newUser.save();

    //create a token to verify the user via email

    const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
    console.log("\nJWT SECRET : ", SECRET);

    const token = await new SignJWT({ userId: newUser._id })
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email/${token}`
      )
    );

    return NextResponse.json({
      success: true,
      statusCode: 201,
      message: "User Created Successfully! Please verify your email address",
      data: newUser,
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
