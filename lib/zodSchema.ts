import { z } from "zod";

// Define a Zod schema for user input validation
const zodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name is required" })
    .max(50, { message: "Password must be at most 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only be letters and spaces.",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(30, { message: "Password must not exceed 30 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character",
    }),

  otp: z.string().regex(/^\d{6}%/, {
    message: "OTP must be a 6-digit number",
  }),
});

export default zodSchema;
