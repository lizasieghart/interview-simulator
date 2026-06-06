"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Phase,
  Question,
  Feedback,
  QuestionType,
  Difficulty,
  AnswerMode,
  UserProfile,
  InterviewConfig,
} from "@/lib/types";

interface InterviewState {
  // Profile (persisted)
  profile: UserProfile;
  setProfile: (p: Partial<UserProfile>) => void;

  // Config
  config: InterviewConfig;
  setConfig: (c: Partial<InterviewConfig>) => void;

  // Job description
  jobDescription: string;
  setJobDescription: (jd: string) => void;

  // Session state
  phase: Phase;
  setPhase: (p: Phase) => void;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, string>;
  feedbacks: Record<string, Feedback>;

  // Loading
  loading: boolean;
  setLoading: (l: boolean) => void;
  error: string | null;
  setError: (e: string | null) => void;

  // Actions
  startSession: (questions: Question[]) => void;
  submitAnswer: (questionId: string, answer: string) => void;
  saveFeedback: (questionId: string, feedback: Feedback) => void;
  nextQuestion: () => void;
  reset: () => void;
}

export const useInterviewStore = create<InterviewState>()(
  persist(
    (set, get) => ({
      profile: {
        industry: "Business/Finance",
        experience: "Mid-level",
        goals: "Prepare for upcoming interviews",
      },
      setProfile: (p) =>
        set((s) => ({ profile: { ...s.profile, ...p } })),

      config: {
        questionType: "behavioral" as QuestionType,
        difficulty: "medium" as Difficulty,
        answerMode: "freeform" as AnswerMode,
        count: 5,
      },
      setConfig: (c) =>
        set((s) => ({ config: { ...s.config, ...c } })),

      jobDescription: "",
      setJobDescription: (jd) => set({ jobDescription: jd }),

      phase: "config" as Phase,
      setPhase: (p) => set({ phase: p }),
      questions: [],
      currentIndex: 0,
      answers: {},
      feedbacks: {},

      loading: false,
      setLoading: (l) => set({ loading: l }),
      error: null,
      setError: (e) => set({ error: e }),

      startSession: (questions) =>
        set({
          questions,
          currentIndex: 0,
          answers: {},
          feedbacks: {},
          phase: "answering",
          error: null,
        }),

      submitAnswer: (questionId, answer) =>
        set((s) => ({
          answers: { ...s.answers, [questionId]: answer },
        })),

      saveFeedback: (questionId, feedback) =>
        set((s) => ({
          feedbacks: { ...s.feedbacks, [questionId]: feedback },
          phase: "feedback",
        })),

      nextQuestion: () => {
        const s = get();
        if (s.currentIndex < s.questions.length - 1) {
          set({ currentIndex: s.currentIndex + 1, phase: "answering" });
        } else {
          set({ phase: "summary" });
        }
      },

      reset: () =>
        set({
          phase: "config",
          questions: [],
          currentIndex: 0,
          answers: {},
          feedbacks: {},
          jobDescription: "",
          loading: false,
          error: null,
        }),
    }),
    {
      name: "interview-store",
      partialize: (state) => ({ profile: state.profile }),
    }
  )
);
