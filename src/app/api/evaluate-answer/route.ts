import { NextResponse } from "next/server";
import { getClient } from "@/lib/anthropic";
import { buildEvaluationPrompt } from "@/lib/prompts";
import type { Feedback, Question, QuestionType, Difficulty } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      question,
      answer,
      questionType = "behavioral" as QuestionType,
      difficulty = "medium" as Difficulty,
      industry = "Business/Finance",
    } = body as {
      question: Question;
      answer: string;
      questionType: QuestionType;
      difficulty: Difficulty;
      industry: string;
    };

    if (!answer || answer.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a more detailed answer (at least 10 characters)." },
        { status: 400 }
      );
    }

    const prompt = buildEvaluationPrompt({
      question,
      answer,
      questionType,
      difficulty,
      industry,
    });

    const client = getClient();
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const feedback: Feedback = JSON.parse(text);

    return NextResponse.json({ feedback });
  } catch (error: unknown) {
    console.error("Evaluation error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to evaluate answer";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
