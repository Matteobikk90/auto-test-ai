import { URL_ENDPOINTS } from "@/constants/urls";
import type { TestType } from "@/types/test";
import { axiosGet } from "@/utils/api";

export async function getTests() {
  return (await axiosGet<TestType[]>(URL_ENDPOINTS.getTests)) || [];
}
