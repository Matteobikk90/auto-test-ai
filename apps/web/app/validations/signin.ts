import { email, object, string } from "zod";

export const signInSchema = object({
  email: email("Invalid email"),
  password: string().min(6, "Password must be at least 6 characters"),
});
