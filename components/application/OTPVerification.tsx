import React from "react";

type OTPprops = {
  email: string;
  onSubmit: () => void;
  loading: boolean;
};
const OTPVerification = ({ email, onSubmit, loading }: OTPprops) => {
  return <div>OTPVerification</div>;
};

export default OTPVerification;
