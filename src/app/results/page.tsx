"use client";

import ResultsSummary from "@/components/ResultsSummary";
import Link from "next/link";

export default function ResultsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-navy-900 text-white px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight hover:text-blue-300 transition-colors">
            InterviewPro
          </Link>
        </div>
      </nav>
      <main className="flex-1 py-10 px-6">
        <ResultsSummary />
      </main>
    </div>
  );
}
