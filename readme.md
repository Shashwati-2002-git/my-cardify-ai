Cardify AI is an AI-powered web application that helps users summarize lengthy text, documents, and website links into short, easy-to-understand summaries, generate flashcards, and take AI-generated quizzes for better learning and memory retention—especially helpful for people with ADHD.

Tech Stack:
    Frontend:
        1. HTML
        2. CSS
        3. JavaScript

    Backend:
        1. Node.js
        2. Express.js

    API:
        1. Gemini AI API
        2. Scrappey API

    Auth & Database:
        1. Firebase Authentication
        2. Firebase / Firestore

File Structure:

Cardify-AI/
│
├── frontend/
│   ├──pages
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── signup.html
│   │   ├── summarise.html
│   │   ├── cardify.html
│   │   ├── forgot-password.html
│   │   ├── link-summary.html
│   │   ├── text-summary.html
│   │   ├── save-summary.html
│   │   └── quiz.html
│   │
│   ├── css/
│   │   ├── header.css
│   │   ├── footer.css
│   │   ├── login.css
│   │   ├── cardify.css
│   │   ├── index-header.css
│   │   ├── index.css
│   │   ├── summarise.css
│   │   ├── quiz.css
│   │   └── chatbot.css
│   │
│   ├── images/
│   ├── js/
│   │   ├── include.js
│   │   ├── firebase-forgot-password.js
│   │   ├── firebase.js
│   │   ├── firebase-login.js
│   │   ├── firebase-logout.js
│   │   ├── firebase-signup.js
│   │   ├── header.js
│   │   ├── index.js
│   │   ├── index-header.js
│   │   ├── link-summary.js
│   │   ├── save-summary.js
│   │   ├── saveSummary.js
│   │   ├── summarise.js
│   │   ├── text-summary.js
│   │   ├── cardify.js
│   │   ├── quiz.js
│   │   └── chatbot.js         
│   │
│   │
│   └── partials/
│       ├── header.html
│       ├── footer.html
│       └── chatbot.html
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   │
│   ├── routes/
│   │   ├── summarise.js
│   │   ├── quiz.js
│   │   ├── linkSummary.js
│   │   ├── textSummary.js
│   │   └── chatbot.js
│   │
│   └── services/
│       ├── mail.js
│       ├── scrappey.js
│       └── geminiServices.js
│
├── .gitignore
└──  README.md
