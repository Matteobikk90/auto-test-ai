export const OPENAI_TASKS = {
  generateTest: {
    model: "gpt-5-nano",
    system:
      "Generate a concise coding challenge with title, question, solution, and explanation. Respond as JSON {title,question,solution,explanation}.",
  },
  validateSubmission: {
    model: "gpt-5-nano",
    system:
      "You are a strict code evaluator. Compare provided user code with the reference task and return JSON {passed:boolean,feedback:string}.",
  },
} as const;
