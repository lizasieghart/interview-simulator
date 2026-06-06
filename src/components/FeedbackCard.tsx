"use client";

import type { Feedback } from "@/lib/types";

interface Props {
  feedback: Feedback;
  isLast: boolean;
  onNext: () => void;
  onSummary: () => void;
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 8 ? "bg-green-100 text-green-800" :
    score >= 5 ? "bg-yellow-100 text-yellow-800" :
    "bg-red-100 text-red-800";
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${color}`}>
      {score}/10
    </span>
  );
}

function StarBar({ label, score, comment }: { label: string; score: number; comment: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-navy-900">{score}/5</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </div>
      <p className="text-xs text-gray-500">{comment}</p>
    </div>
  );
}

export default function FeedbackCard({ feedback, isLast, onNext, onSummary }: Props) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Overall Score */}
      <div className="card flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-navy-900">Your Score</h3>
          <p className="text-sm text-gray-500">{feedback.summary}</p>
        </div>
        <ScoreBadge score={feedback.overallScore} />
      </div>

      {/* STAR Evaluation */}
      {feedback.starEvaluation && (
        <div className="card space-y-4">
          <h3 className="font-semibold text-navy-900">STAR Framework Breakdown</h3>
          <StarBar label="Situation" score={feedback.starEvaluation.situation.score} comment={feedback.starEvaluation.situation.comment} />
          <StarBar label="Task" score={feedback.starEvaluation.task.score} comment={feedback.starEvaluation.task.comment} />
          <StarBar label="Action" score={feedback.starEvaluation.action.score} comment={feedback.starEvaluation.action.comment} />
          <StarBar label="Result" score={feedback.starEvaluation.result.score} comment={feedback.starEvaluation.result.comment} />
        </div>
      )}

      {/* Strengths */}
      <div className="card space-y-3">
        <h3 className="font-semibold text-green-700 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Strengths
        </h3>
        <ul className="space-y-2">
          {feedback.strengths.map((s, i) => (
            <li key={i} className="text-sm text-gray-700 pl-4 border-l-2 border-green-300">
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Improvements */}
      <div className="card space-y-3">
        <h3 className="font-semibold text-amber-700 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Areas for Improvement
        </h3>
        <ul className="space-y-2">
          {feedback.improvements.map((s, i) => (
            <li key={i} className="text-sm text-gray-700 pl-4 border-l-2 border-amber-300">
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        {!isLast && (
          <button onClick={onNext} className="btn-primary flex-1">
            Next Question &rarr;
          </button>
        )}
        <button
          onClick={onSummary}
          className={isLast ? "btn-primary flex-1" : "btn-secondary flex-1"}
        >
          {isLast ? "View Summary" : "End & View Summary"}
        </button>
      </div>
    </div>
  );
}
