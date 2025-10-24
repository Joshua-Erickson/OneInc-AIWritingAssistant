🧠 AI Writing Assistant
  - A single-page web application that leverages Large Language Models (LLMs) to rephrase user input into different writing styles — professional, casual, polite, and social media. The project demonstrates full-stack    development, API integration, and clean UX design.

🎯 Objective
  - Build an interactive AI-powered writing assistant that:
  - Accepts text input from the user.
  - Rephrases it into multiple tones and styles using an LLM API (e.g., OpenAI, Claude).
  - Presents each style clearly and responsively in a single-page UI.

🧩 Tech Stack
  - Frontend: React.js, TypeScript, Vite
  - Backend: Python, Node.js
  - Containerization: Docker
  - LLM Integration: Hugging Face - DeepSeek v3-0324

⚙️ Features
✅ Core Functionality
  - ✍️ User inputs text and clicks “Process”.
  - 🔁 Backend sends the text to the LLM and receives rephrased responses.
  - 💬 Frontend displays responses in four styles:
    - Professional
    - Casual
    - Polite
    - Social Media
  - 🚫 While processing:
    - Users cannot submit another request.
    - A “Cancel” button allows stopping the process.
  - ⚡ Streaming Output: See the LLM’s response appear in real-time (word-by-word or sentence-by-sentence).
  - 🪶 Separated output panels

Assumptions
  - You have Docker and Docker Compose installed.
  - You have Node.js and npm installed for running the frontend.
  - .env contains your secret API key, which is not in this repo.
  - Backend container exposes port 8000.
  - Frontend expects the backend API at https://localhost:8000.

Backend Setup
  - Create a .env file in the backend folder.
    - ```HF_API_KEY=(HuggingFace Token)```
  - Build and run the backend container
    - ```cd backend```
    - ```docker-compose up --build```

Frontend Setup
  - Navigate to the frontend folder
    - ```cd frontend```
    - ```npm install```
    - ```npm run dev```

  - Open "https://localhost:5173"
