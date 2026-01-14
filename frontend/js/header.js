import { logoutUser } from "./firebase-logout.js";

export function initHeader() {
  const profileIcon = document.getElementById("profile-icon");
  const profileMenu = document.getElementById("profile-menu");
  const logoutBtn = document.getElementById("logout-btn");
  const notesBtn = document.getElementById("notes-btn");
  const homeBtn = document.getElementById("home-btn");

  if (!profileIcon || !profileMenu || !logoutBtn || !notesBtn || !homeBtn) {
    console.error("❌ Header elements not found");
    return;
  }

  profileIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    profileMenu.style.display =
      profileMenu.style.display === "block" ? "none" : "block";
  });

  homeBtn.addEventListener("click", () => {
    window.location.href = "/summarise";
  });

  logoutBtn.addEventListener("click", async () => {
    await logoutUser();
  });

  notesBtn.addEventListener("click", () => {
    window.location.href = "/save-summary";
  });

  document.addEventListener("click", () => {
    profileMenu.style.display = "none";
  });

  console.log("✅ Header initialized");
}