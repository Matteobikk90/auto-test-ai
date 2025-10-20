export type TestType = {
  id: number;
  title: string;
  question: string;
  solution?: string;
  prompt: string;
  language: string;
  submissions?: SubmissionType[];
};

export type SubmissionType = {
  id: number;
  code: string;
  feedback?: string;
  passed?: boolean;
  createdAt: string;
  userId: string;
  testId: number;
};
