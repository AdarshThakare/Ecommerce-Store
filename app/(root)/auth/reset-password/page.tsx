"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Logo from "@/public/assets/images/logo-black.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import zodSchema from "@/lib/zodSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/application/LoadingButton";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Link from "next/link";
import {
  WEBSITE_LOGIN,
  WEBSITE_REGISTER,
  WEBSITE_RESETPASSWORD,
} from "@/routes/UserRoute";
import { carme } from "@/lib/fonts";
import axios from "axios";
import { showToast } from "@/lib/showToast";
import OTPVerification from "@/components/application/OTPVerification";
import UpdatePage from "@/components/application/UpdatePassword";

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState<string>("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [otpVerificationLoading, setOTPVerificationLoading] = useState(false);

  const formSchema = zodSchema.pick({
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleEmailVerification = async (value: z.infer<typeof formSchema>) => {
    console.log("The entered email is - ", value);

    try {
      setIsLoading(true);
      const { data: sendOtpResponse } = await axios.post(
        "/api/auth/reset-password/send-otp",
        value
      );

      if (!sendOtpResponse.success) {
        throw new Error(sendOtpResponse.message);
      }

      setOtpEmail(value.email);
      showToast("success", sendOtpResponse.message);
    } catch (err) {
      if (err instanceof Error) {
        showToast("error", err.message);
      } else {
        showToast("error", "An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  //Handling OTP Verification
  const handleOTPVerification = async (value: z.infer<typeof formSchema>) => {
    console.log("The entered OTP Values are - ", value);

    try {
      setOTPVerificationLoading(true);
      const { data: OTPResponse } = await axios.post(
        "/api/auth/reset-password/verify-otp",
        value
      );

      if (!OTPResponse.success) {
        throw new Error(OTPResponse.message);
      }
      setIsOtpVerified(true);
      showToast("success", OTPResponse.message);
    } catch (err) {
      if (err instanceof Error) {
        showToast("error", err.message);
      } else {
        showToast("error", "An unexpected error occurred.");
      }
    } finally {
      setOTPVerificationLoading(false);
    }
  };

  return (
    <>
      {/* Background Slides */}
      <div className="bg-slide-login"></div>
      <div className="bg-slide-login bg2"></div>
      <div className="bg-slide-login bg3"></div>
      <Card className="opacity-80 ">
        <CardContent>
          <div className="flex justify-center">
            <Image
              src={Logo}
              alt="Logo"
              height={100}
              width={100}
              className="w-[150px]"
            />
          </div>

          {!otpEmail ? (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-bold mt-3">Reset your password</h1>
                <p className={`${carme.className} mt-1`}>
                  Enter your details for password reset
                </p>
              </div>

              {/* Login Form section  */}
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleEmailVerification)}
                    className="mt-6"
                  >
                    <div className="mb-3">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              className={`${carme.className} text-md tracking-wider`}
                            >
                              Email -
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                className={`${carme.className} text-md tracking-wide `}
                                {...field}
                              />
                            </FormControl>
                            {/* To display validation messages */}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <LoadingButton
                        isLoading={isLoading}
                        type="submit"
                        text="Send OTP"
                        onClick={() => {}}
                        className="w-full text-lg py-5 cursor-pointer"
                      />
                    </div>
                    <div className={`mt-4 text-center ${carme.className}`}>
                      <p>Remembered your Password?</p>
                      <Link
                        href={WEBSITE_LOGIN}
                        className="text-primary ml-3 hover:font-semibold hover:underline"
                      >
                        Back to login
                      </Link>
                    </div>
                  </form>
                </Form>
              </div>
            </>
          ) : (
            <>
              {!isOtpVerified ? (
                <OTPVerification
                  email={otpEmail}
                  isLoading={otpVerificationLoading}
                  onSubmit={handleOTPVerification}
                />
              ) : (
                <UpdatePage email={otpEmail} />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ResetPasswordPage;
