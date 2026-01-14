// frontend/js/save-summary.js
import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const listEl = document.getElementById("savedSummaryList");
const contentEl = document.getElementById("summaryContent");

let currentSummaryId = null;
let currentPoints = [];

/* ----------------------------
   Load summaries
---------------------------- */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    console.log("❌ Not logged in");
    return;
  }

  listEl.innerHTML = ""; // prevent duplicates

  const q = query(
    collection(db, "summaries"),
    where("uid", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    listEl.innerHTML = "<li>No saved summaries yet</li>";
    return;
  }

  snapshot.forEach((docSnap) => {
    const li = document.createElement("li");
    li.textContent = docSnap.data().title;

    li.onclick = () =>
      selectSummary(docSnap.id, docSnap.data(), li);

    listEl.appendChild(li);
  });
});

/* ----------------------------
   Select summary
---------------------------- */
function selectSummary(id, data, li) {
  document.querySelectorAll(".left-panel li")
    .forEach(el => el.classList.remove("active"));

  li.classList.add("active");

  currentSummaryId = id;
  currentPoints = data.points;

  contentEl.innerHTML = "";

  data.points.forEach(point => {
    const item = document.createElement("li");
    item.textContent = point;
    contentEl.appendChild(item);
  });
}

/* ----------------------------
   Cardify / Quiz
---------------------------- */
function cardifyCurrent() {
  if (!currentPoints.length) {
    alert("Select a summary first");
    return;
  }
  localStorage.setItem("cardifyPoints", JSON.stringify(currentPoints));
  window.location.href = "/cardify";
}

function quizCurrent() {
  if (!currentPoints.length) {
    alert("Select a summary first");
    return;
  }
  localStorage.setItem("cardifyPoints", JSON.stringify(currentPoints));
  window.location.href = "/quiz";
}

/* ----------------------------
   Rename
---------------------------- */
function openRenameDialog() {
  if (!currentSummaryId) return alert("Select a summary first");
  document.getElementById("renameDialog").classList.remove("hidden");
}

function closeRenameDialog() {
  document.getElementById("renameDialog").classList.add("hidden");
}

async function confirmRename() {
  const title = document.getElementById("newSummaryTitle").value.trim();
  if (!title) return;

  await updateDoc(
    doc(db, "summaries", currentSummaryId),
    { title }
  );

  location.reload();
}

/* ----------------------------
   Delete
---------------------------- */
function openDeleteDialog() {
  if (!currentSummaryId) return alert("Select a summary first");
  document.getElementById("deleteDialog").classList.remove("hidden");
}

function closeDeleteDialog() {
  document.getElementById("deleteDialog").classList.add("hidden");
}

async function confirmDelete() {
  await deleteDoc(doc(db, "summaries", currentSummaryId));
  location.reload();
}

/* ----------------------------
   Expose to HTML
---------------------------- */
window.cardifyCurrent = cardifyCurrent;
window.quizCurrent = quizCurrent;
window.openRenameDialog = openRenameDialog;
window.closeRenameDialog = closeRenameDialog;
window.confirmRename = confirmRename;
window.openDeleteDialog = openDeleteDialog;
window.closeDeleteDialog = closeDeleteDialog;
window.confirmDelete = confirmDelete;