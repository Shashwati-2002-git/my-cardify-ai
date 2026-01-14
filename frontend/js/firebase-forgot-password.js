import { auth } from "./firebase.js";
import {
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const resetForm = document.getElementById("resetForm");
const message = document.getElementById("message");

resetForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();

  message.textContent = "";
  message.style.display = "none";

  try {
    await sendPasswordResetEmail(auth, email);

    message.style.color = "white";
    message.textContent = "Password reset email sent successfully!";
    message.style.display = "block";

    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);

  } catch (error) {
    message.style.color = "red";

    if (error.code === "auth/user-not-found") {
      message.textContent = "No account found with this email.";
    } 
    else if (error.code === "auth/invalid-email") {
      message.textContent = "Invalid email address.";
    } 
    else {
      message.textContent = "Something went wrong. Please try again.";
    }

    message.style.display = "block";
  }
});