import { object, string } from "zod";

export const submitTestSchema = object({
  code: string()
    .trim()
    .min(10, "Code too short")
    .refine((val) => /function|=>|return|module\.exports|export\s+/.test(val), {
      message: "Code must contain a valid function or export",
    }),
});
