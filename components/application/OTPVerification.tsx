import { carme } from "@/lib/fonts";
import zodSchema from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LoadingButton } from "./LoadingButton";
import z from "zod";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import axios from "axios";
import { showToast } from "@/lib/showToast";

type OTPprops = {
  email: string;
  onSubmit: (value: { otp: string; email: string }) => void;
  isLoading: boolean;
};
const OTPVerification = ({ email, onSubmit, isLoading }: OTPprops) => {
  const [isResendOtpLoading, setIsResendOtpLoading] = useState(false);

  const formSchema = zodSchema.pick({
    otp: true,
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      email: email,
    },
  });

  const handleOtpVerification = async (value: z.infer<typeof formSchema>) => {
    onSubmit(value);
  };

  const handleResendOTP = async () => {
    try {
      setIsResendOtpLoading(true);
      const { data: ResemdOTPResponse } = await axios.post(
        "/api/auth/resend-otp",
        {
          email,
        }
      );

      if (!ResemdOTPResponse.success) {
        throw new Error(ResemdOTPResponse.message);
      }

      showToast("success", ResemdOTPResponse.message);
    } catch (err) {
      if (err instanceof Error) {
        showToast("error", err.message);
      } else {
        showToast("error", "An unexpected error occurred.");
      }
    } finally {
      setIsResendOtpLoading(false);
    }
  };
  return (
    <div className="w-100">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOtpVerification)}
          className="mt-6 "
        >
          <div className="text-center">
            <h1 className={`font-bold mb-2  text-2xl`}>
              Please complete the Verification.
            </h1>
            <p className={`text-md ${carme.className} text-center`}>
              We have sent an One-Time Password (OTP) to your registered email
              address.
            </p>
            <p className={`text-md ${carme.className} text-center mt-2`}>
              The OTP is valid for 10 Minutes only.
            </p>
          </div>
          <div className="my-6 flex justify-center">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot className="text-2xl size-12" index={0} />
                        <InputOTPSlot className="text-2xl size-12" index={1} />
                        <InputOTPSlot className="text-2xl size-12" index={2} />
                        <InputOTPSlot className="text-2xl size-12" index={3} />
                        <InputOTPSlot className="text-2xl size-12" index={4} />
                        <InputOTPSlot className="text-2xl size-12" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
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
              text="Verify"
              onClick={() => {}}
              className="w-full text-lg py-5 cursor-pointer"
            />
            <div className={`text-center text-lg mt-3 mb-4 ${carme.className}`}>
              <span>Didn't Receive anything ?</span>
              {isResendOtpLoading ? (
                <span className="text-primary ml-3 ">Resending...</span>
              ) : (
                <button
                  onClick={handleResendOTP}
                  className="text-primary ml-3 hover:font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OTPVerification;
