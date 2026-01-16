const summaryList = document.getElementById("summaryList");
const textInput = document.getElementById("textInput");

function syncSummaryToLocalStorage() {
  const points = Array.from(
    summaryList.querySelectorAll("li")
  )
    .map(li => li.textContent.trim())
    .filter(Boolean);

  localStorage.setItem("cardifyPoints", JSON.stringify(points));
}

async function sendText() {
  const text = textInput.value.trim();
  if (!text) {
    alert("Please paste some text first.");
    return;
  }

  summaryList.innerHTML = "<li>Summarising text using AI...</li>";

  try {
    const res = await fetch("/api/text-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    summaryList.innerHTML = "";

    if (!data.summary) {
      summaryList.innerHTML = "<li>Could not generate summary.</li>";
      return;
    }

    data.summary
      .split("\n")
      .filter(line => line.trim())
      .forEach(point => {
        const li = document.createElement("li");
        li.textContent = point.replace(/^[-•*]/, "").trim();
        summaryList.appendChild(li);
      });
      syncSummaryToLocalStorage();
  } catch (err) {
    console.error(err);
    summaryList.innerHTML = "<li>Error while summarising text.</li>";
  }
}

function goToCardify() {
  const points = Array.from(document.querySelectorAll("#summaryList li"))
    .map(li => li.textContent);

  localStorage.setItem("cardifyPoints", JSON.stringify(points));
  window.location.href = "/cardify";
}

function goToQuiz() {
  const points = Array.from(document.querySelectorAll("#summaryList li"))
    .map(li => li.textContent.trim())
    .filter(Boolean);

  localStorage.setItem("cardifyPoints", JSON.stringify(points));

  window.location.href = "/quiz";
}

function goToSummarise() {
  window.location.href = "/summarise";
}

function goToLinkSummary() {
  window.location.href = "/link-summary";
}