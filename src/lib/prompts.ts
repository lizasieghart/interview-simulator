import { QuestionType, Difficulty, AnswerMode, Question } from "./types";

interface GenerationInput {
  questionType: QuestionType;
  difficulty: Difficulty;
  count: number;
  industry: string;
  experience: string;
  answerMode: AnswerMode;
  jobDescription?: string;
}

const DIFFICULTY_GUIDE: Record<Difficulty, string> = {
  easy: "entry-level, straightforward scenarios with clear expectations",
  medium: "mid-level, nuanced situations requiring thoughtful analysis",
  hard: "senior-level, complex multi-stakeholder scenarios with competing priorities and ambiguity",
};

const TYPE_GUIDE: Record<QuestionType, string> = {
  behavioral:
    "Behavioral questions using the STAR framework. Ask about past experiences: 'Tell me about a time when...' or 'Describe a situation where...' Focus on leadership, teamwork, conflict resolution, problem-solving, and adaptability.",
  case: "Open-ended business case questions. Present a realistic business scenario and ask the candidate to analyze it, identify key issues, and propose solutions. Relevant to the candidate's industry.",
  situational:
    "Situational judgment questions. Present a hypothetical workplace dilemma with nuanced tradeoffs and ask how the candidate would handle it. No single 'right' answer — test judgment and reasoning.",
};

export function buildGenerationPrompt(input: GenerationInput): string {
  const jdSection = input.jobDescription
    ? `\n\nThe candidate is preparing for a specific role. Tailor questions to this job description:\n---\n${input.jobDescription}\n---`
    : "";

  const mcInstruction =
    input.answerMode === "multiple-choice"
      ? `For each question, also generate exactly 4 answer choices (A through D). One should be clearly strong, one clearly weak, and two somewhere in between. Set "choices" to an array of 4 strings.`
      : `Set "choices" to null for all questions.`;

  return `You are an expert interviewer specializing in the ${input.industry} industry.

Generate exactly ${input.count} ${input.difficulty}-difficulty ${input.questionType} interview questions.

Difficulty guide: ${DIFFICULTY_GUIDE[input.difficulty]}
Question style: ${TYPE_GUIDE[input.questionType]}

The candidate's experience level: ${input.experience}.${jdSection}

${mcInstruction}

Respond ONLY with a valid JSON array. Each element must have this shape:
{
  "id": "q1",
  "text": "The question text",
  "type": "${input.questionType}",
  "choices": ["A) ...", "B) ...", "C) ...", "D) ..."] | null
}

No markdown, no explanation — just the JSON array.`;
}

interface EvaluationInput {
  question: Question;
  answer: string;
  questionType: QuestionType;
  difficulty: Difficulty;
  industry: string;
}

export function buildEvaluationPrompt(input: EvaluationInput): string {
  const starInstruction =
    input.questionType === "behavioral"
      ? `
Evaluate the answer against the STAR framework (Situation, Task, Action, Result).
For each STAR component, provide a score from 1-5 and a brief comment.
Include this as "starEvaluation" in your response:
{
  "situation": { "score": 1-5, "comment": "..." },
  "task": { "score": 1-5, "comment": "..." },
  "action": { "score": 1-5, "comment": "..." },
  "result": { "score": 1-5, "comment": "..." }
}`
      : `Set "starEvaluation" to null.`;

  return `You are a senior interview coach specializing in the ${input.industry} industry.

Evaluate this ${input.questionType} interview answer at ${input.difficulty} difficulty.

QUESTION: ${input.question.text}

CANDIDATE'S ANSWER: ${input.answer}

${starInstruction}

Provide:
- "strengths": 2-3 specific things the candidate did well (array of strings)
- "improvements": 2-3 specific areas for improvement with actionable advice (array of strings)
- "overallScore": a score from 1 to 10
- "summary": a 2-sentence overall assessment

Respond ONLY with valid JSON matching this shape:
{
  "strengths": ["...", "..."],
  "improvements": ["...", "..."],
  "starEvaluation": { ... } | null,
  "overallScore": 7,
  "summary": "..."
}

No markdown, no explanation — just the JSON.`;
}
