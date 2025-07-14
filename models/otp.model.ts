import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000), //10 Minues
    },
  },
  { timestamps: true }
);

//using TTL (Time-To-Live) feature in MongoDB to delete the record from the database once it expires, to not waste space in storing useless data
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// ✅ Only create model if it hasn't been compiled already
const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema, "OTPs");

export default OTP;
