import { object, string } from "zod";

export const generateSchema = object({
  prompt: string().min(10, "Prompt must be at least 10 characters"),
});
