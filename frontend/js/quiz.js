// frontend/js/quiz.js

const quizArea = document.getElementById("quizArea");
const scoreBox = document.getElementById("scoreBox");

let quizData = [];

// Get summary points from browser storage
const summaryPoints =
  JSON.parse(localStorage.getItem("cardifyPoints")) || [];

if (!summaryPoints.length) {
  quizArea.innerHTML =
    "<p>No summary found. Please generate notes first.</p>";
} else {
  generateQuiz(summaryPoints);
}

// ----------------------------
// Generate Quiz
// ----------------------------
async function generateQuiz(points) {
  quizArea.innerHTML = "<p class='loading-text'>Generating quiz...</p>";

  try {
    const response = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ points })
    });

    if (!response.ok) {
      throw new Error("Failed to generate quiz");
    }

    const data = await response.json();
    quizData = data.quiz;

    renderQuiz();
  } catch (err) {
    console.error("Quiz error:", err);
    quizArea.innerHTML = "<p>Error generating quiz.</p>";
  }
}

// ----------------------------
// Render Quiz
// ----------------------------
function renderQuiz() {
  quizArea.innerHTML = "";

  quizData.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "quiz-box";

    div.innerHTML = `
      <p class="question">${index + 1}. ${q.question}</p>

      <div class="options">
        ${Object.entries(q.options)
          .map(
            ([key, value]) => `
              <label>
                <input type="radio" name="q${index}" value="${key}">
                ${key}. ${value}
              </label>
            `
          )
          .join("")}
      </div>

      <p class="feedback" id="feedback-${index}"></p>
    `;

    quizArea.appendChild(div);
  });
}

// ----------------------------
// Submit Quiz
// ----------------------------
function submitQuiz() {
  let score = 0;

  quizData.forEach((q, index) => {
    const selected = document.querySelector(
      `input[name="q${index}"]:checked`
    );

    const feedbackEl = document.getElementById(`feedback-${index}`);

    const correctLetter = String(q.correctAnswer)
      .trim()
      .charAt(0)
      .toUpperCase();

    if (!selected) {
      feedbackEl.textContent =
        `No option selected. The correct option is ${correctLetter}.`;
      feedbackEl.className = "feedback wrong";
      return;
    }

    if (selected.value === correctLetter) {
      score++;
      feedbackEl.textContent = "Correct answer. Well done!";
      feedbackEl.className = "feedback correct";
    } else {
      feedbackEl.textContent =
        `Wrong answer. The correct option is ${correctLetter}.`;
      feedbackEl.className = "feedback wrong";
    }
  });

  scoreBox.textContent = `Total Score: ${score} / 10`;
}

window.submitQuiz = submitQuiz;