import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const form = document.getElementById("signupForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  message.textContent = "";

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match";
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    message.textContent = "Account created successfully. Redirecting...";
    message.style.display = "block";

    setTimeout(() => {
      window.location.href = "/summarise";
    }, 2000);

  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      message.textContent = "An account with this email already exists.";
    } else if (error.code === "auth/weak-password") {
      message.textContent = "Password should be at least 6 characters.";
    } else {
      message.textContent = "Something went wrong. Please try again.";
    }

    message.style.display = "block";
  }
});