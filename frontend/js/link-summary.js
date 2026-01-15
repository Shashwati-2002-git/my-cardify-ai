// frontend/js/link-summary.js
const summaryList = document.getElementById("summaryList");
const linkInput = document.getElementById("linkInput");
const sendBtn = document.querySelector(".send-btn");

function syncSummaryToLocalStorage() {
  const points = Array.from(
    summaryList.querySelectorAll("#summaryList li")
  )
    .map(li => li.textContent.trim())
    .filter(Boolean);

  localStorage.setItem("cardifyPoints", JSON.stringify(points));
}

async function sendLink() {
  const link = linkInput.value.trim();
  if (!link) {
    alert("Please paste a link first.");
    return;
  }

  summaryList.innerHTML = "<li>Processing link, please wait...</li>";
  sendBtn.disabled = true;

  try {
    // ✅ Updated API URL to match backend route
    const response = await fetch("/api/link-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: link })
    });

    // Parse JSON response
    const data = await response.json();

    if (!response.ok || data.error) {
      summaryList.innerHTML = `<li>${data.error || "Server error"}</li>`;
      return;
    }

    // Clear previous summary and add new points
    summaryList.innerHTML = "";
    data.summary.forEach(point => {
      const li = document.createElement("li");
      li.textContent = point;
      summaryList.appendChild(li);
    });
    syncSummaryToLocalStorage();
  } catch (err) {
    console.error(err);
    summaryList.innerHTML = "<li>Error processing link</li>";
  } finally {
    sendBtn.disabled = false;
  }
}

// Send link on Enter key press
linkInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // prevent form-like submit behavior
    sendLink();
  }
});

// Navigate to Cardify page with saved points
function goToCardify() {
  const points = Array.from(summaryList.children).map(li => li.textContent);
  localStorage.setItem("cardifyPoints", JSON.stringify(points));
  window.location.href = "/cardify";
}

// Navigate to Quiz page
function goToQuiz() {
  const points = Array.from(document.querySelectorAll("#summaryList li"))
    .map(li => li.textContent.trim())
    .filter(Boolean);

  localStorage.setItem("cardifyPoints", JSON.stringify(points));

  window.location.href = "/quiz";
}

// Expose functions to HTML buttons
window.sendLink = sendLink;
window.goToCardify = goToCardify;
window.goToQuiz = goToQuiz;