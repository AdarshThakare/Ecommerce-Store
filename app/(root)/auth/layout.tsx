import { ChildrenProps } from "@/app/layout";
import React from "react";

const layout = ({ children }: ChildrenProps) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default layout;
