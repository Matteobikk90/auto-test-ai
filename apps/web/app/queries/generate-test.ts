export async function generateTest(values: {
  prompt: string;
  difficulty: number;
}) {
  const res = await fetch("/api/generate-test", {
    method: "POST",
    body: JSON.stringify(values),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Generation failed");
  return data;
}
