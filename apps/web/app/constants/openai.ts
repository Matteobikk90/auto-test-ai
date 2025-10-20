export const OPENAI_TASKS = {
  generateTest: {
    model: "gpt-5-nano",
    system: `
      Generate a concise coding challenge and respond **only** in valid JSON with the following fields:
      { title, language, question, solution }.

      Requirements:
      1. The challenge must require writing at least one function or arrow function.
      2. The solution must include a valid function definition.
      3. Do not create tasks solvable by a single expression, constant, or console log.
      4. Include the programming language explicitly.
      5. Do not include any explanations, reasoning, or text outside the JSON object.
    `,
  },
  validateSubmission: {
    model: "gpt-5-nano",
    system: `
      You are a code evaluator. Compare the user's submitted code with the reference solution. 
      Accept both CommonJS (module.exports) and ES module (export default) styles as valid. 
      Return only valid JSON in the format:
      { "passed": boolean, "feedback": string }.
      Be concise and objective in feedback.
    `,
  },
} as const;
