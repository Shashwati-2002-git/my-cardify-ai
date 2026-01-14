// frontend/js/saveSummary.js
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";

// 🔐 Firebase config (same as login/signup)
const firebaseConfig = {
  apiKey: "AIzaSyApCQg1RTi7Dw--PIuvO1576PSiglYXawI",
  authDomain: "cardify-ai-4511a.firebaseapp.com",
  projectId: "cardify-ai-4511a",
  storageBucket: "cardify-ai-4511a.firebasestorage.app",
  messagingSenderId: "1052786706458",
  appId: "1:1052786706458:web:d77d4ae6282eadbfe9e9a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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

  // Wait until Firebase Auth confirms the user is logged in
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

// Make functions globally accessible for inline HTML
window.openSaveDialog = openSaveDialog;
window.closeSaveDialog = closeSaveDialog;
window.confirmSave = confirmSave;