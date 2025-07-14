import { NextResponse } from "next/server";

type ResponseProp = {
  success: boolean;
  statusCode: number;
  message: string;
  data: object;
};

type ErrorProp = {
  customMessage: string;
  error: {
    code: number;
    message: string;
    keyPattern: string;
  };
};

export const response = ({
  success,
  statusCode,
  message,
  data = {},
}: ResponseProp) => {
  return NextResponse.json({
    success,
    statusCode,
    message,
    data,
  });
};

export const catchError = ({ error, customMessage }: ErrorProp) => {
  //handling duplocate key error

  if (error.code === 110000) {
    const keys = Object.keys(error.keyPattern).join(",");
    error.message = `Duplicate Fields : ${keys} . \n These Fields value must be unique`;
  }

  let errorObj = {};

  if (process.env.NODE_ENV === "development") {
    errorObj = {
      message: error.message,
      error,
    };
  } else {
    errorObj = {
      message: customMessage || "Internal Server Error",
    };
  }

  return response({
    success: false,
    statusCode: 500,
    message: String(error.code),
    data: errorObj,
  });
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
