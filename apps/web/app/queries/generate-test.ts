import { URL_ENDPOINTS } from "@/constants/urls";

export async function generateTest(values: {
  prompt: string;
  difficulty: number;
}) {
  const res = await fetch(URL_ENDPOINTS.generateTest, {
    method: "POST",
    body: JSON.stringify(values),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Generation failed");
  return data;
}
