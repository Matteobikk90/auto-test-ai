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
      You are a strict but fair code evaluator.

      Compare the user's submitted code with the reference solution and decide if it solves the task.
      Accept both CommonJS (module.exports) and ES module (export default) styles as valid.

      Also detect spammy or nonsensical submissions (e.g. empty, unrelated, random text, or placeholder comments).
      Return a JSON object with exactly:
      { "passed": boolean, "feedback": string, "isSpam": boolean }

      - "passed" = true only if the code correctly solves the task.
      - "isSpam" = true only if the code is meaningless or clearly not an attempt.
      Keep feedback concise and technical.
    `,
  },
} as const;
