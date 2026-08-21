# AspirePath AI - Backend Service

Node.js and Express API server powering the AspirePath AI platform.

## Features

* **RESTful API**: Endpoints for users, notes, courses, assessments, quizzes, and placements.
* **Authentication**: JWT token-based authentication with bcrypt password encryption.
* **Role-Based Access Control**: Protected routes for administrators and standard users.
* **Real-time WebSockets**: Socket.IO integration for live updates and notifications.
* **AI Integration**: AI assistant, skill assessment generation, and note summarization.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in the values:
```bash
cp .env.example .env
```

Required variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/aspirepathai
JWT_SECRET=your_jwt_secret_min_32_chars
FRONTEND_URL=http://localhost:5173
```

### 3. Run the Server
```bash
# Development mode with hot-reload
npm run dev

# Production mode
npm start
```
