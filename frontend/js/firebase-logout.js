import { signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { auth } from "./firebase.js";

export async function logoutUser() {
  try {
    await signOut(auth);

    // Clear app data
    localStorage.removeItem("cardifyPoints");

    // Redirect after logout
    window.location.href = "/login";
  } catch (err) {
    console.error("Logout failed:", err);
    alert("Logout failed. Try again.");
  }
}