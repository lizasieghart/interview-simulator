"use client";

import { useInterviewStore } from "@/store/useInterviewStore";
import type { QuestionType, Difficulty, AnswerMode } from "@/lib/types";

export default function ConfigPanel({ onStart }: { onStart: () => void }) {
  const { profile, setProfile, config, setConfig, jobDescription, setJobDescription, loading } =
    useInterviewStore();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-navy-900 mb-1">Set Up Your Session</h2>
        <p className="text-gray-500">Customize your practice interview.</p>
      </div>

      {/* Profile */}
      <div className="card space-y-4">
        <h3 className="font-semibold text-navy-900">Your Profile</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Industry</span>
            <input
              type="text"
              value={profile.industry}
              onChange={(e) => setProfile({ industry: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Experience Level</span>
            <select
              value={profile.experience}
              onChange={(e) => setProfile({ experience: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option>Entry-level</option>
              <option>Mid-level</option>
              <option>Senior</option>
              <option>Executive</option>
            </select>
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Career Goals</span>
          <input
            type="text"
            value={profile.goals}
            onChange={(e) => setProfile({ goals: e.target.value })}
            placeholder="e.g. Transition to investment banking"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </label>
      </div>

      {/* Question Config */}
      <div className="card space-y-4">
        <h3 className="font-semibold text-navy-900">Interview Settings</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Question Type</span>
            <select
              value={config.questionType}
              onChange={(e) => setConfig({ questionType: e.target.value as QuestionType })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="behavioral">Behavioral (STAR)</option>
              <option value="case">Case Study</option>
              <option value="situational">Situational Judgment</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Difficulty</span>
            <select
              value={config.difficulty}
              onChange={(e) => setConfig({ difficulty: e.target.value as Difficulty })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Answer Mode</span>
            <select
              value={config.answerMode}
              onChange={(e) => setConfig({ answerMode: e.target.value as AnswerMode })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="freeform">Free-form Text</option>
              <option value="multiple-choice">Multiple Choice</option>
            </select>
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Number of Questions</span>
          <select
            value={config.count}
            onChange={(e) => setConfig({ count: parseInt(e.target.value) })}
            className="mt-1 block w-40 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {[3, 5, 7, 10].map((n) => (
              <option key={n} value={n}>
                {n} questions
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Job Description */}
      <div className="card space-y-4">
        <h3 className="font-semibold text-navy-900">
          Job Description <span className="text-gray-400 font-normal text-sm">(optional)</span>
        </h3>
        <p className="text-sm text-gray-500">
          Paste a job description to generate questions tailored to that specific role.
        </p>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={5}
          placeholder="Paste the full job description or key requirements here..."
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"
        />
      </div>

      <button onClick={onStart} disabled={loading} className="btn-primary w-full text-lg py-4">
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating Questions...
          </span>
        ) : (
          "Generate Questions & Start"
        )}
      </button>
    </div>
  );
}
