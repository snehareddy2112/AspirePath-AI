"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, MessageSquare, FileText, Trophy, BarChart3, Star } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Learning Hub",
    description:
      "Structured learning paths for DSA, MERN, AI/ML, and core CS topics with clear progress tracking.",
    points: ["Guided Roadmaps", "Video + Practice", "Progress Analytics"],
  },
  {
    icon: Brain,
    title: "AI Study Buddy",
    description:
      "24/7 AI assistant for doubt solving, learning guidance, and career clarity.",
    points: ["Instant Answers", "Personalized Guidance", "Smart Suggestions"],
  },
  {
    icon: MessageSquare,
    title: "Tech Feed",
    description:
      "Curated tech news, internships, hackathons, and job opportunities.",
    points: ["Daily Updates", "Internships", "Hiring Alerts"],
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description:
      "ATS-optimized resumes with AI-powered improvement suggestions.",
    points: ["ATS Templates", "AI Feedback", "Cover Letters"],
  },
  {
    icon: Trophy,
    title: "Placement Prep",
    description:
      "Mock interviews, coding rounds, and company-specific preparation.",
    points: ["Mock Interviews", "Coding Rounds", "HR Prep"],
  },
  {
    icon: BarChart3,
    title: "Smart Dashboard",
    description:
      "Personalized dashboard to track goals, streaks, and learning progress.",
    points: ["Daily Planner", "Progress Graphs", "Study Streaks"],
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative bg-[#050816] text-[#F8FAFC] py-24"
    >
      {/* background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[500px] bg-[#6366F1]/20 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full border border-white/10 bg-white/5 text-[#C7D2FE]">
            <Star size={14} className="text-[#A855F7]" />
            Powerful Features
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#6366F1] to-[#22D3EE]">
              Everything You Need
            </span>
            <br />to Excel in Tech
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-[#C7D2FE]">
            Aspire Path AI combines intelligent learning, AI guidance, and
            placement-focused tools to accelerate your career.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-7 group"
            >
              {/* glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7]/10 to-[#22D3EE]/10 blur-xl" />
              </div>

              <div className="relative">
                <div className="w-14 h-14 mb-5 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#22D3EE] flex items-center justify-center">
                  <feature.icon className="text-black" />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm text-[#C7D2FE] mb-5">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.points.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#A855F7] to-[#22D3EE]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
