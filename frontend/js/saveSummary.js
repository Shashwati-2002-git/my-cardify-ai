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

// Make functions available to HTML
window.openSaveDialog = openSaveDialog;
window.closeSaveDialog = closeSaveDialog;
window.confirmSave = confirmSave;