import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  bio: z.string().optional(),
  image: z.string().url("Invalid image URL").optional(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
