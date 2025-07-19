import Image from "next/image";
import React from "react";
import loading from "@/public/assets/images/loading.svg";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-start mt-12">
      <Image src={loading} alt="loading" width={80} height={80} />
    </div>
  );
};

export default Loading;
