import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      trim: true,
      enum: ["user", "admin"],
      default: "user",
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      select: false,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    avatar: {
      url: {
        type: String,
        trim: true,
      },
      public_id: {
        type: String,
        trim: true,
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods = {
  comparePassword: async function (password: string) {
    return await bcrypt.compare(password, this.password);
  },
};

// ✅ Only create model if it hasn't been compiled already
const User =
  mongoose.models.User || mongoose.model("User", UserSchema, "users");

export default User;
