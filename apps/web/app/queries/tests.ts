import { URL_ENDPOINTS } from "@/constants/urls";
import type { TestType } from "@/types/test";
import { axiosGet, axiosPost } from "@/utils/api";

export async function getTests() {
  return (await axiosGet<TestType[]>(URL_ENDPOINTS.tests.getAll)) || [];
}

export async function submitTest({
  testId,
  code,
}: {
  testId: number;
  code: string;
}) {
  return axiosPost<
    { passed: boolean; feedback: string },
    { testId: number; code: string }
  >(URL_ENDPOINTS.tests.submit, { testId, code });
}
