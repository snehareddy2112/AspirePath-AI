# AspirePath AI - Frontend Application

React + TypeScript Single Page Application built with Vite and Tailwind CSS.

## Features

* **Interactive Dashboard**: Real-time progress widgets, streak calendars, and personalized daily goals.
* **Learning Hub**: Structured modules across DSA, Full-Stack, Java, and Machine Learning.
* **In-Browser Coding**: Integrated editor with test case execution.
* **ATS Resume Builder**: Live resume creation with ATS score analysis.
* **AI Study Buddy**: Real-time conversational AI study assistant.
* **Quiz Center**: Timed quizzes, performance reviews, and solution tracking.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Set your backend API URL:
```env
VITE_API_URL=http://localhost:5000
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```
Output bundle is generated in `dist/`.
