"use client";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import verifiedImg from "@/public/assets/images/verified.gif";
import verificationFailed from "@/public/assets/images/verification-failed.gif";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WEBSITE_HOME } from "@/routes/UserRoute";
import { use, useEffect, useState } from "react";
import { carme } from "@/lib/fonts";
import { Loader2 } from "lucide-react";

interface EmailVerificationProps {
  params: { token: string };
}

const EmailVerification = ({ params }: EmailVerificationProps) => {
  //extracting token from "http://localhost:3000/auth/verify-email/ey21973..."

  // @ts-ignore
  const { token } = use(params);

  console.log(token);

  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //getting the user credentials from the token
  useEffect(() => {
    setIsLoading(true);
    const verify = async () => {
      const { data: verificationResponse } = await axios.post(
        "/api/auth/verify-email",
        { token }
      );

      console.log(verificationResponse);
      if (verificationResponse.success) {
        setIsVerified(true);
      }
    };

    verify();
    setIsLoading(false);
  }, [token]);
  return (
    <>
      {/* Background Slides */}
      <div className="bg-slide-login"></div>
      <div className="bg-slide-login bg2"></div>
      <div className="bg-slide-login bg3"></div>
      <Card className="w-[400px]">
        {isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2" />
          </>
        ) : (
          <CardContent>
            {isVerified ? (
              <div>
                <div className="flex justify-center items-center">
                  <Image
                    src={verifiedImg}
                    alt={""}
                    height={100}
                    width={100}
                    className="h-[100px]"
                  />
                </div>
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-green-500 my-5">
                    Email Verification Successful!
                  </h1>
                  <Button asChild className={`text-lg p-5 ${carme.className}`}>
                    <Link href={`${WEBSITE_HOME}`}>Continue Shopping </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-center items-center">
                  <Image
                    src={verificationFailed}
                    alt={""}
                    height={100}
                    width={100}
                    className="h-[100px]"
                  />
                </div>
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-red-500 my-5">
                    Email Verification Failed!
                  </h1>
                  <Button asChild className={`text-lg p-5 ${carme.className}`}>
                    <Link href={`${WEBSITE_HOME}`}>Continue Shopping </Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default EmailVerification;
