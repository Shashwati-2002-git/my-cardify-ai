// DOM references
const fileInput = document.getElementById("fileInput");
const fileNameSpan = document.getElementById("fileName");
const summaryList = document.getElementById("summaryList");

let uploadedText = "";

function syncSummaryToLocalStorage() {
  const points = Array.from(
    summaryList.querySelectorAll("li")
  )
    .map(li => li.textContent.trim())
    .filter(Boolean);

  localStorage.setItem("cardifyPoints", JSON.stringify(points));
}

function triggerUpload() {
  fileInput.click();
}

fileInput.addEventListener("change", async () => {
  const file = fileInput.files[0];
  if (!file) return;

  fileNameSpan.textContent = file.name;
  uploadedText = "";

  if (file.type === "application/pdf") {
    uploadedText = await extractTextFromPDF(file);
  } else {
    uploadedText = await readTextFile(file);
  }
});

function readTextFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsText(file);
  });
}

async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(" ") + "\n";
  }
  return text;
}

async function sendDocument() {
  if (!uploadedText.trim()) {
    alert("Please upload a document first.");
    return;
  }
  await summariseText(uploadedText);
}

async function summariseText(text) {
  summaryList.innerHTML = "<li>Summarising using AI...</li>";

  try {
    const response = await fetch("/api/summarise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await response.json();
    summaryList.innerHTML = "";

    if (!data.summary) {
      summaryList.innerHTML = "<li>Failed to generate summary.</li>";
      return;
    }

    data.summary.split("\n")
      .filter((line) => line.trim())
      .forEach((point) => {
        const li = document.createElement("li");
        li.textContent = point.replace(/^[-•*]/, "").trim();
        summaryList.appendChild(li);
      });
      syncSummaryToLocalStorage();
  } catch (err) {
    summaryList.innerHTML = "<li>Error while summarising.</li>";
    console.error(err);
  }
}

// Send document on Enter key (after file upload)
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // Prevent accidental submits
    e.preventDefault();

    // Only send if a document is uploaded and not empty
    if (uploadedText && uploadedText.trim()) {
      sendDocument();
    }
  }
});

// Navigation functions
function goToCardify() {
  const points = Array.from(document.querySelectorAll("#summaryList li"))
    .map((li) => li.textContent);
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

function goToLinkSummary() {
  window.location.href = "/link-summary";
}

function goToTextSummary() {
  window.location.href = "/text-summary";
}

// Export functions to global scope if using inline HTML buttons
window.triggerUpload = triggerUpload;
window.sendDocument = sendDocument;
window.goToCardify = goToCardify;
window.goToLinkSummary = goToLinkSummary;
window.goToTextSummary = goToTextSummary;
window.goToQuiz = goToQuiz;