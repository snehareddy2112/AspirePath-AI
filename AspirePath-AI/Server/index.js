import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";

// Load environment variables first
dotenv.config();

import connectDB from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";
import authorize from "./middleware/authorize.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import courseRoutes from "./routes/courseRoutes.js";
import adminCourseRoutes from "./routes/adminCourseRoutes.js"; // ✅ ADD THIS
import adminFeedbackRoutes from "./routes/adminFeedbackRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import userQuizRoutes from "./routes/userQuizRoutes.js";
import atsRoutes from "./routes/atsRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import javaRoutes from "./routes/javaRoutes.js";
import aimlRoutes from "./routes/aimlRoutes.js";
import mernRoutes from "./routes/mernRoutes.js";
import dsaRoutes from "./routes/dsaRoutes.js";
import contestRoutes from "./routes/contestRoutes.js";
import placementRoutes from "./routes/placementRoutes.js";
import compilerRoutes from "./routes/compilerRoutes.js";
import contactSupport from "./routes/contactSupport.js";
import newsRoutes from "./routes/newsRoutes.js";
import Faq from "./routes/faq.js";
import systemSettings from "./routes/SystemSettingRoute.js";
import videoProgressRoutes from "./routes/videoProgressRoutes.js";
import sanitizeMiddleware from "./middleware/sanitizeMiddleware.js";
import analyticRoute from "./routes/analytics.js";
import interviewExperienceRoutes from "./routes/interviewExperienceRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import subscribeRoutes from "./routes/subscribeRoutes.js";
// Add static file serving for uploaded files (add this after other middleware)
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import http from "http";
import { initSocketIO } from "./socket.js";
import { startContestFinalizationCron } from "./controller/contestController.js";

// Connect to MongoDB only if MONGO_URI is available
if (process.env.MONGO_URI) {
  connectDB();
} else {
}

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /\.vercel\.app$/.test(origin) ||
        /\.netlify\.app$/.test(origin) ||
        /^http:\/\/localhost(:\d+)?$/.test(origin) ||
        /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin);
      if (isAllowed || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);
app.use(express.json());
app.use(cookieParser());

//sanitize-html
app.use(sanitizeMiddleware);

app.set("trust proxy", true);

// Routes
app.use("/api/v1/notifications", notificationRoutes);
// USER ROUTES
app.use("/api/v1", userRoutes);
app.use("/api/v1", contactSupport);
app.use("/api/v1", Faq);
app.use("/api/v1", newsRoutes);
app.use("/api/v1/community", communityRoutes);
app.use("/api/v1/ats", atsRoutes);
app.use("/api/v1/experience", experienceRoutes);
app.use("/api/v1/assessment", assessmentRoutes);

// ✅ Video Progress & Saved Videos (ONLY ONCE!)
app.use("/api/v1/video", videoProgressRoutes);

// ✅ PUBLIC COURSE ROUTES (YouTube API - No auth required)
app.use("/api/v1/courses", courseRoutes);

// ✅ ADMIN COURSE ROUTES (MongoDB courses - Public read, Admin write)
app.use("/api/v1/admin-courses", adminCourseRoutes);

// ADMIN ROUTES
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/admin/feedback", adminFeedbackRoutes);
app.use("/api/v1/admin/quiz", quizRoutes);
app.use("/api/v1/admin/analytics", analyticRoute);
app.use("/api/v1/admin", systemSettings);

// ✅ USER QUIZ ROUTES (Changed from /quiz to /user-quiz)
app.use("/api/v1/user-quiz", userQuizRoutes);
// ✅ AI ROUTES (Changed from / to /ai)
app.use("/api/v1/ai", aiRoutes);
// Skill Assessment Routes
app.use("/api/v1/assessments", assessmentRoutes);

// Dashboard Routes
import dashboardRoutes from "./routes/dashboardRoutes.js";
app.use("/api/v1/dashboard", dashboardRoutes);

// Learning Routes
app.use("/api/v1/learning/java", javaRoutes);
app.use("/api/v1/learning/aiml", aimlRoutes);
app.use("/api/v1/learning/mern", mernRoutes);
app.use("/api/v1/learning/dsa", dsaRoutes);

// Compiler Routes
app.use("/api/v1/compiler", compilerRoutes);

// Placement Routes
app.use("/api/v1/placements", placementRoutes);

// Contest Routes
app.use("/api/v1/contests", contestRoutes);
startContestFinalizationCron(app);
// Root & Health check routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AspirePath AI API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// TEST ROUTE
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.get("/api/v1/courses/test", (req, res) => {
  res.json({ message: "Course route is working!" });
});

// Notes Routes
app.use("/api/notes", notesRoutes);

// Interview Experience Routes
app.use("/api/interview-experience", interviewExperienceRoutes);

// Subscribe route for Newsletter
app.use("/api/subscribe", subscribeRoutes);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Sample Usage of authenticate and authorize middleware for roleBased Features
app.get(
  "/api/admin/dashboard",
  authenticateToken,
  authorize("admin"),
  (req, res) => {
    res.send("Hello Admin");
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler - MUST BE LAST!
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Create HTTP server from Express app
const server = http.createServer(app);
initSocketIO(server);

// Start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
