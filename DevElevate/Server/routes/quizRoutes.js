import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  deleteQuiz,
  updateQuizInfo,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getQuizById,
} from "../controller/quizController.js";

import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";
import mongoose from "mongoose";

const router = express.Router();

// ✅ Admin-only protection
router.use(authenticateToken, requireAdmin);

// Quiz-level routes
router.post("/", createQuiz);
router.get("/", getAllQuizzes);

// Question-level routes
router.post("/:quizId/questions", addQuestion);
router.put("/:quizId/questions/:questionId", updateQuestion);
router.delete("/:quizId/questions/:questionId", deleteQuestion);

// Quiz by ID route with ObjectId validation
router.get("/:quizId", (req, res, next) => {
  const { quizId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    return res.status(400).json({ error: "Invalid quiz ID" });
  }

  return getQuizById(req, res, next);
});

router.put("/:id", updateQuizInfo);
router.delete("/:id", deleteQuiz);

export default router;
/*import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  deleteQuiz,
  updateQuizInfo,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getQuizById,
  getUserQuizAttempts,
} from "../controller/quizController.js";
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";
import { getAllSubmissionsDetailed } from "../controller/submissionController.js";
import mongoose from "mongoose";

const router = express.Router();

// All routes are protected and admin-only
router.use(authenticateToken, requireAdmin);

// Quiz-level routes
router.post("/", createQuiz);
router.get("/", getAllQuizzes);

// Question-level routes
router.post("/:quizId/questions", addQuestion);
router.put("/:quizId/questions/:questionId", updateQuestion);
router.delete("/:quizId/questions/:questionId", deleteQuestion);

// Submissions route (must be before :quizId)
router.get("/submissions", getAllSubmissionsDetailed);

// User quiz attempts route (must be before :quizId)
router.get(
  "/attempts",
  authenticateToken,
  getUserQuizAttempts
);

// Quiz by ID route with ObjectId validation
router.get("/:quizId", (req, res, next) => {
  const { quizId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    return res.status(400).json({ error: "Invalid quiz ID" });
  }

  return getQuizById(req, res, next);
});

router.put("/:id", updateQuizInfo);
router.delete("/:id", deleteQuiz);

export default router;*/
