import axios from "axios";
import dotenv from "dotenv";
import Quiz from "../model/Quiz.js";
import QuizAttempt from "../model/QuizAttempt.js";

dotenv.config();

/**
 * OpenRouter helper (single place for AI calls)
 */
const openRouterRequest = async (messages) => {
  return axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-3.5-turbo",
      messages,
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
};
//console.log("🔑 OpenRouter Key Loaded:", process.env.OPENROUTER_API_KEY ? "YES" : "NO");

/**
 * ===============================
 * BASIC AI CHAT / QUIZ RESPONSE
 * ===============================
 */
export const getAIReply = async (req, res) => {
  const { message, category } = req.body;
  if (!message) return res.status(400).json({ error: "No input provided" });

  try {
    let prompt = message;

    if (category && category.toLowerCase() === "quiz") {
      prompt = `You are Study Buddy, an AI mentor specializing in DSA quizzes.
Generate 6 deep-level MCQ questions on "${message}".
Each question must have 4 options and clearly mark the correct answer.
Only provide the quiz. No explanations.`;
    }

    const response = await openRouterRequest([
      { role: "user", content: prompt },
    ]);

    const aiText =
      response.data?.choices?.[0]?.message?.content || "No reply received";

    return res.status(200).json({ reply: aiText });

  } catch (error) {
    console.error("OpenRouter Error:", error.response?.data || error.message);

    if (error.response?.status === 429) {
      return res.status(429).json({
        error: "AI rate limit exceeded. Please try again later.",
      });
    }

    return res.status(500).json({ error: "AI service unavailable" });
  }
};

/**
 * ===============================
 * AI QUIZ GENERATOR
 * ===============================
 */
export const generateAIQuiz = async (req, res) => {
  try {
    const { topic, difficulty, type, questionCount } = req.body;
    const userId = req.user.id;

    if (!topic || !difficulty || !type || !questionCount) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    let prompt = "";

    if (type === "MCQ") {
      prompt = `Generate ${questionCount} multiple choice questions about "${topic}" at ${difficulty} difficulty.

Return ONLY valid JSON:
{
  "questions": [
    {
      "questionText": "Question?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A"
    }
  ]
}

Rules:
- Exactly ${questionCount} questions
- 4 options per question
- correctAnswer must match one option exactly
- No extra text`;
    } else {
      prompt = `Generate ${questionCount} coding questions about "${topic}" at ${difficulty} level.

Return ONLY valid JSON:
{
  "questions": [
    {
      "questionText": "Problem statement",
      "expectedOutput": "Expected output or approach"
    }
  ]
}`;
    }

    const response = await openRouterRequest([
      { role: "user", content: prompt },
    ]);

    const aiText = response.data?.choices?.[0]?.message?.content;
    if (!aiText) {
      return res.status(500).json({ message: "AI returned empty response" });
    }

    let parsed;
    try {
      parsed = JSON.parse(aiText.trim());
    } catch (err) {
      console.error("JSON parse failed:", aiText);
      return res.status(500).json({
        message: "Failed to parse AI response",
        debug: aiText,
      });
    }

    const questions = parsed.questions.map((q) =>
      type === "MCQ"
        ? {
            questionText: q.questionText,
            options: q.options,
            correctAnswer: q.correctAnswer,
          }
        : {
            questionText: q.questionText,
            expectedOutput: q.expectedOutput,
          }
    );

    const quiz = new Quiz({
      title: `${topic} - ${difficulty} (AI Generated)`,
      topic,
      difficulty,
      type,
      questions,
      createdBy: userId,
      isAIGenerated: true,
    });

    await quiz.save();

    const quizAttempt = new QuizAttempt({
      userId,
      quizId: quiz._id,
      answers: [],
      score: 0,
      totalQuestions: questions.length,
      timeTaken: 0,
      isGenerated: true,
    });

    await quizAttempt.save();

    return res.status(201).json({
      message: "AI Quiz generated successfully",
      quiz: {
        _id: quiz._id,
        title: quiz.title,
        topic,
        difficulty,
        type,
        questionCount: questions.length,
        isAIGenerated: true,
      },
    });

  } catch (error) {
    console.error("AI Quiz Error:", error.response?.data || error.message);

    if (error.response?.status === 429) {
      return res.status(429).json({
        message: "AI rate limit exceeded. Try again later.",
      });
    }

    return res.status(500).json({
      message: "Failed to generate AI quiz",
    });
  }
};

/**
 * ===============================
 * AI NOTES GENERATOR
 * ===============================
 */
export const generateAINote = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!prompt?.trim()) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const fullPrompt = `You are an expert educator.
Generate detailed, well-structured study notes using Markdown.

Topic: ${prompt}

Requirements:
- Use headings
- Explain concepts clearly
- Add examples
- Include summary
- If technical, include code blocks`;

    const response = await openRouterRequest([
      { role: "user", content: fullPrompt },
    ]);

    const content = response.data?.choices?.[0]?.message?.content;
    if (!content) {
      return res.status(500).json({ message: "Failed to generate notes" });
    }

    const title = prompt
      .split(" ")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ")
      .slice(0, 60);

    return res.status(200).json({
      success: true,
      title,
      content,
      tags: ["AI-Generated"],
      message: "Note generated successfully",
    });

  } catch (error) {
    console.error("AI Notes Error:", error.response?.data || error.message);

    if (error.response?.status === 429) {
      return res.status(429).json({
        message: "AI rate limit exceeded. Try again later.",
      });
    }

    return res.status(500).json({
      message: "Failed to generate AI note",
    });
  }
};
