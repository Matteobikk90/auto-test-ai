import { email, object, string, url } from "zod";

export const registerSchema = object({
  name: string().min(1, "Name is required"),
  email: email("Invalid email"),
  password: string().min(6, "Password must be at least 6 characters"),
  bio: string(),
  image: string().refine((val) => val === "" || url().safeParse(val).success, {
    message: "Invalid image URL",
  }),
});
