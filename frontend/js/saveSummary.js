// frontend/js/saveSummary.js
import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

function syncPointsToLocalStorage() {
  const points = Array.from(
    summaryList.querySelectorAll("li") // or wherever your points are displayed
  )
    .map(li => li.textContent.trim())
    .filter(Boolean);

  localStorage.setItem("cardifyPoints", JSON.stringify(points));
}

// ----------------------------
// Save dialog functions
// ----------------------------
function openSaveDialog() {
  document.getElementById("saveDialog").classList.remove("hidden");
}

function closeSaveDialog() {
  document.getElementById("saveDialog").classList.add("hidden");
}

async function confirmSave() {
  syncPointsToLocalStorage();
  const title = document.getElementById("summaryTitle").value.trim();
  if (!title) {
    alert("Please enter a title");
    return;
  }

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const points = JSON.parse(localStorage.getItem("cardifyPoints")) || [];
    if (!points.length) {
      alert("No summary to save");
      return;
    }

    try {
      await addDoc(collection(db, "summaries"), {
        uid: user.uid,
        title,
        points,
        source: window.location.pathname,
        createdAt: serverTimestamp()
      });

      alert("Summary saved successfully!");
      closeSaveDialog();
    } catch (err) {
      console.error("Error saving summary:", err);
      alert("Failed to save summary. Check console.");
    }
  });
}

// Submit save dialog on Enter key
document.addEventListener("keydown", (e) => {
  const dialog = document.getElementById("saveDialog");
  const titleInput = document.getElementById("summaryTitle");

  // Only trigger when dialog is open AND input is focused
  if (
    !dialog.classList.contains("hidden") &&
    document.activeElement === titleInput &&
    e.key === "Enter"
  ) {
    e.preventDefault();
    confirmSave();
  }
});

// Make functions available to HTML
window.openSaveDialog = openSaveDialog;
window.closeSaveDialog = closeSaveDialog;
window.confirmSave = confirmSave;