import { URL_ENDPOINTS } from "@/constants/urls";
import { axiosPost } from "@/utils/api";
import type { RegisterBody } from "@repo/types/src/register";

export function register(body: RegisterBody) {
  return axiosPost<{ success: boolean }, RegisterBody>(
    URL_ENDPOINTS.auth.register,
    body
  );
}
