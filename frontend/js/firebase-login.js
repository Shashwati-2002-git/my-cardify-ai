import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  message.textContent = "";
  message.style.display = "none";

  try {
    await signInWithEmailAndPassword(auth, email, password);

    message.textContent = "Login successful. Redirecting...";
    message.style.display = "block";

    setTimeout(() => {
      window.location.href = "/summarise";
    }, 2000);

  } catch (error) {
    if (error.code === "auth/user-not-found") {
      message.textContent = "No account found with this email.";
    } 
    else if (error.code === "auth/wrong-password") {
      message.textContent = "Incorrect password.";
    } 
    else if (error.code === "auth/invalid-email") {
      message.textContent = "Invalid email address.";
    } 
    else {
      message.textContent = "Login failed. Please try again.";
    }

    message.style.display = "block";
  }
});