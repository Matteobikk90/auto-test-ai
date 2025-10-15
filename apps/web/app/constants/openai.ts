export const OPENAI_TASKS = {
  generateTest: {
    model: "gpt-5-nano",
    system:
      "Generate a concise coding challenge and respond **only** in valid JSON with the following fields: {title, language, question, solution}. Include the programming language explicitly. Avoid explanations, reasoning, or commentary outside the JSON object.",
  },
  validateSubmission: {
    model: "gpt-5-nano",
    system:
      "You are a strict code evaluator. Compare provided user code with the reference task and return JSON {passed:boolean,feedback:string}.",
  },
} as const;
