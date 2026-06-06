"use client";

import { useState } from "react";
import type { Question } from "@/lib/types";

interface Props {
  question: Question;
  index: number;
  total: number;
  loading: boolean;
  onSubmit: (answer: string) => void;
}

export default function QuestionCard({ question, index, total, loading, onSubmit }: Props) {
  const [answer, setAnswer] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const hasChoices = question.choices && question.choices.length > 0;
  const currentAnswer = hasChoices ? selected : answer;
  const canSubmit = currentAnswer && currentAnswer.trim().length >= 10 && !loading;

  const handleSubmit = () => {
    if (currentAnswer) {
      onSubmit(currentAnswer);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Question {index + 1} of {total}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
          {question.type}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="card">
        <p className="text-lg font-medium text-navy-900 leading-relaxed">{question.text}</p>
      </div>

      {/* Answer Area */}
      {hasChoices ? (
        <div className="space-y-3">
          {question.choices!.map((choice, i) => (
            <button
              key={i}
              onClick={() => setSelected(choice)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selected === choice
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <span className="text-sm">{choice}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="card">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-2 block">Your Answer</span>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={8}
              placeholder="Structure your answer using the STAR method: Situation, Task, Action, Result..."
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"
            />
          </label>
          <p className="text-xs text-gray-400 mt-2">
            {answer.length < 10
              ? `${10 - answer.length} more characters needed`
              : `${answer.length} characters`}
          </p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="btn-primary w-full"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Analyzing Your Answer...
          </span>
        ) : (
          "Submit Answer"
        )}
      </button>
    </div>
  );
}
