document.addEventListener("DOMContentLoaded", () => {
  const cardsWrapper = document.getElementById("cardsWrapper");
  const quizBtn = document.getElementById("quizBtn");
  const saveBtn = document.getElementById("saveBtn");
  const clearBtn = document.getElementById("clearBtn");

  // Load points from localStorage
  let points = JSON.parse(localStorage.getItem("cardifyPoints")) || [];

  // Display cards
  function renderCards() {
    cardsWrapper.innerHTML = "";
    if (!points.length) {
      cardsWrapper.innerHTML = "<p>No cards to display.</p>";
      return;
    }

    points.forEach((point, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = point;
      cardsWrapper.appendChild(card);
    });
  }

  renderCards();

  // Navigate to Quiz page
  quizBtn.addEventListener("click", () => {
    if (!points.length) {
      alert("No points to quiz on. Add some cards first!");
      return;
    }
    window.location.href = "/quiz";
  });

  // Save points locally
  saveBtn.addEventListener("click", () => {
    if (!points.length) {
      alert("No points to save!");
      return;
    }
    localStorage.setItem("cardifyPoints", JSON.stringify(points));
    alert("Points saved locally!");
  });

  // Clear all cards
  clearBtn.addEventListener("click", () => {
    if (!points.length) return;
    if (confirm("Are you sure you want to clear all cards?")) {
      points = [];
      localStorage.removeItem("cardifyPoints");
      renderCards();
    }
  });
});