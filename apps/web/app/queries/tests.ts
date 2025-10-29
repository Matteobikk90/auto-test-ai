import { URL_ENDPOINTS } from "@/constants/urls";
import { axiosGet, axiosPost } from "@/utils/api";
import type {
  SubmitTestReqType,
  SubmitTestResType,
  TestType,
} from "@repo/types/test";

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
  return axiosPost<SubmitTestReqType, SubmitTestResType>(
    URL_ENDPOINTS.tests.submit,
    { testId, code }
  );
}
