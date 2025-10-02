Overview

This repository contains a SPA frontend and a FastAPI backend, which is fully containerized using Docker
  - The frontend runs locally using Node.js and Vite.
  - The backend runs inside a Linux-based Docker container and provides the API endpoints for the SPA.
  - Environment variables (like API keys) are loaded from a local .env file for the backend only.

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
