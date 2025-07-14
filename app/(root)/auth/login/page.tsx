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
import { USER_REGISTER } from "@/routes/UserRoute";
import { carme } from "@/lib/fonts";
import axios from "axios";
import { showToast } from "@/lib/showToast";
import OTPVerification from "@/components/application/OTPVerification";

const LoginPage = () => {
  // Needed States
  const [isLoading, setIsLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState<string>("");
  const [otpVerificationLoading, setOTPVerificationLoading] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // select only the required fields for the login form
  const formSchema = zodSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min(3, { message: "Password is required" }),
    });

  // use the form schema with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //to handle form submission for login
  const onHandleLoginSubmit = async (value: z.infer<typeof formSchema>) => {
    console.log("Login Form Submitted", value);

    try {
      setIsLoading(true);
      const { data: loginResponse } = await axios.post(
        "/api/auth/login",
        value
      );

      if (!loginResponse.success) {
        throw new Error(loginResponse.message);
      }

      setOtpEmail(value.email);
      form.reset();
      showToast("success", loginResponse.message);
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
  const handleOTPVerification = async (value: {
    otp: string;
    email: string;
  }) => {
    console.log("The entered OTP Values are - ", value);

    try {
      setOTPVerificationLoading(true);
      const { data: OTPResponse } = await axios.post(
        "/api/auth/verify-otp",
        value
      );

      if (!OTPResponse.success) {
        throw new Error(OTPResponse.message);
      }

      setOtpEmail("");
      form.reset();
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
                <h1 className="text-3xl font-bold mt-3">Login Into Account</h1>
                <p className={`${carme.className} mt-1`}>
                  Log into your account by filling the form below.
                </p>
              </div>

              {/* Login Form section  */}
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onHandleLoginSubmit)}
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
                    <div className="mb-5 relative">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              className={`${carme.className} text-md `}
                            >
                              Password -
                            </FormLabel>
                            <FormControl>
                              <Input
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                className={`${carme.className} text-md `}
                                {...field}
                              />
                            </FormControl>
                            <button
                              type="button"
                              onClick={() =>
                                setIsPasswordVisible(!isPasswordVisible)
                              }
                              className="absolute right-5 top-[43px] text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                              {!isPasswordVisible ? (
                                <FaRegEyeSlash />
                              ) : (
                                <FaRegEye />
                              )}
                            </button>
                            {/* To display validation messages */}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div
                      className={`ms-1 text-sm -mt-3 mb-4 ${carme.className}`}
                    >
                      <span>Forgot your Password ?</span>
                      <Link
                        href="/auth/register"
                        className="text-primary ml-3 hover:font-semibold hover:underline"
                      >
                        Reset Password
                      </Link>
                    </div>
                    <div>
                      <LoadingButton
                        isLoading={isLoading}
                        type="submit"
                        text="Login"
                        onClick={() => {}}
                        className="w-full text-lg py-5 cursor-pointer"
                      />
                    </div>
                    <div className={`mt-4 text-center ${carme.className}`}>
                      <p>Don&apos;t have an Account yet ?</p>
                      <Link
                        href={USER_REGISTER}
                        className="text-primary ml-3 hover:font-semibold hover:underline"
                      >
                        Create your Account
                      </Link>
                    </div>
                  </form>
                </Form>
              </div>
            </>
          ) : (
            <>
              <OTPVerification
                email={otpEmail}
                isLoading={otpVerificationLoading}
                onSubmit={handleOTPVerification}
              />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default LoginPage;
