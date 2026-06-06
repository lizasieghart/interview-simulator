"use client";

import { useInterviewStore } from "@/store/useInterviewStore";
import Link from "next/link";

export default function ResultsSummary() {
  const { questions, answers, feedbacks, config, reset } = useInterviewStore();

  const answeredQuestions = questions.filter((q) => feedbacks[q.id]);
  const avgScore =
    answeredQuestions.length > 0
      ? answeredQuestions.reduce((sum, q) => sum + (feedbacks[q.id]?.overallScore ?? 0), 0) /
        answeredQuestions.length
      : 0;

  const allStrengths = answeredQuestions.flatMap((q) => feedbacks[q.id]?.strengths ?? []);
  const allImprovements = answeredQuestions.flatMap((q) => feedbacks[q.id]?.improvements ?? []);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-navy-900 mb-2">Session Complete</h2>
        <p className="text-gray-500">
          You answered {answeredQuestions.length} of {questions.length} questions
        </p>
      </div>

      {/* Score Overview */}
      <div className="card text-center">
        <div className="text-5xl font-bold text-blue-600 mb-2">{avgScore.toFixed(1)}</div>
        <div className="text-sm text-gray-500">Average Score out of 10</div>
        <div className="mt-4 flex justify-center gap-2">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full capitalize">
            {config.questionType}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full capitalize">
            {config.difficulty}
          </span>
        </div>
      </div>

      {/* Top Themes */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="card space-y-3">
          <h3 className="font-semibold text-green-700">Top Strengths</h3>
          <ul className="space-y-2">
            {allStrengths.slice(0, 5).map((s, i) => (
              <li key={i} className="text-sm text-gray-700 pl-3 border-l-2 border-green-300">{s}</li>
            ))}
          </ul>
        </div>
        <div className="card space-y-3">
          <h3 className="font-semibold text-amber-700">Key Improvements</h3>
          <ul className="space-y-2">
            {allImprovements.slice(0, 5).map((s, i) => (
              <li key={i} className="text-sm text-gray-700 pl-3 border-l-2 border-amber-300">{s}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Question-by-Question */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-navy-900">Detailed Review</h3>
        {answeredQuestions.map((q, i) => {
          const fb = feedbacks[q.id];
          return (
            <details key={q.id} className="card group">
              <summary className="cursor-pointer flex items-center justify-between">
                <span className="text-sm font-medium text-navy-900">
                  Q{i + 1}: {q.text.slice(0, 80)}...
                </span>
                <span
                  className={`text-sm font-bold px-2 py-0.5 rounded ${
                    fb.overallScore >= 8
                      ? "bg-green-100 text-green-800"
                      : fb.overallScore >= 5
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {fb.overallScore}/10
                </span>
              </summary>
              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Your Answer:</p>
                  <p className="text-gray-600 bg-gray-50 rounded p-3">{answers[q.id]}</p>
                </div>
                <p className="text-gray-600">{fb.summary}</p>
              </div>
            </details>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-center">
        <button onClick={reset} className="btn-primary px-8">
          Start New Session
        </button>
        <Link href="/" className="btn-secondary px-8">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
