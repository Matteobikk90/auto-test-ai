import { URL_ENDPOINTS } from "@/constants/urls";
import type { RegisterBody } from "@/types/register";
import { axiosPost } from "@/utils/api";

export function register(body: RegisterBody) {
  return axiosPost<{ success: boolean }, RegisterBody>(
    URL_ENDPOINTS.auth.register,
    body
  );
}
