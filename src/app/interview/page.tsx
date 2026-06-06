"use client";

import { useInterviewStore } from "@/store/useInterviewStore";
import ConfigPanel from "@/components/ConfigPanel";
import QuestionCard from "@/components/QuestionCard";
import FeedbackCard from "@/components/FeedbackCard";
import ResultsSummary from "@/components/ResultsSummary";
import Link from "next/link";

export default function InterviewPage() {
  const store = useInterviewStore();
  const {
    phase,
    profile,
    config,
    jobDescription,
    questions,
    currentIndex,
    feedbacks,
    loading,
    error,
    setLoading,
    setError,
    startSession,
    submitAnswer,
    saveFeedback,
    nextQuestion,
    setPhase,
    reset,
  } = store;

  const handleStart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionType: config.questionType,
          difficulty: config.difficulty,
          count: config.count,
          industry: profile.industry,
          experience: profile.experience,
          answerMode: config.answerMode,
          jobDescription: jobDescription || undefined,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      startSession(data.questions);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async (answer: string) => {
    const question = questions[currentIndex];
    submitAnswer(question.id, answer);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          answer,
          questionType: config.questionType,
          difficulty: config.difficulty,
          industry: profile.industry,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      saveFeedback(question.id, data.feedback);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to evaluate answer");
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentIndex];
  const currentFeedback = currentQuestion ? feedbacks[currentQuestion.id] : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="bg-navy-900 text-white px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight hover:text-blue-300 transition-colors">
            InterviewPro
          </Link>
          {phase !== "config" && (
            <button onClick={reset} className="text-sm text-gray-400 hover:text-white transition-colors">
              New Session
            </button>
          )}
        </div>
      </nav>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 px-6 py-3">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <p className="text-sm text-red-700">{error}</p>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 text-sm">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 py-10 px-6">
        {phase === "config" && <ConfigPanel onStart={handleStart} />}
        {phase === "answering" && currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            index={currentIndex}
            total={questions.length}
            loading={loading}
            onSubmit={handleSubmitAnswer}
          />
        )}
        {phase === "feedback" && currentFeedback && (
          <FeedbackCard
            feedback={currentFeedback}
            isLast={currentIndex === questions.length - 1}
            onNext={nextQuestion}
            onSummary={() => setPhase("summary")}
          />
        )}
        {phase === "summary" && <ResultsSummary />}
      </main>
    </div>
  );
}
