export type QuestionType = "behavioral" | "case" | "situational";
export type Difficulty = "easy" | "medium" | "hard";
export type AnswerMode = "freeform" | "multiple-choice";

export interface UserProfile {
  industry: string;
  experience: string;
  goals: string;
}

export interface InterviewConfig {
  questionType: QuestionType;
  difficulty: Difficulty;
  answerMode: AnswerMode;
  count: number;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  choices: string[] | null;
}

export interface STAREvaluation {
  situation: { score: number; comment: string };
  task: { score: number; comment: string };
  action: { score: number; comment: string };
  result: { score: number; comment: string };
}

export interface Feedback {
  strengths: string[];
  improvements: string[];
  starEvaluation: STAREvaluation | null;
  overallScore: number;
  summary: string;
}

export type Phase = "config" | "answering" | "feedback" | "summary";
