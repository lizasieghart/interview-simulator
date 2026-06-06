import { NextResponse } from "next/server";
import { getClient } from "@/lib/anthropic";
import { buildGenerationPrompt } from "@/lib/prompts";
import type { Question, QuestionType, Difficulty, AnswerMode } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      questionType = "behavioral" as QuestionType,
      difficulty = "medium" as Difficulty,
      count = 5,
      industry = "Business/Finance",
      experience = "mid-level",
      answerMode = "freeform" as AnswerMode,
      jobDescription,
    } = body;

    const prompt = buildGenerationPrompt({
      questionType,
      difficulty,
      count,
      industry,
      experience,
      answerMode,
      jobDescription,
    });

    const client = getClient();
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const questions: Question[] = JSON.parse(text);

    return NextResponse.json({ questions });
  } catch (error: unknown) {
    console.error("Question generation error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate questions";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
