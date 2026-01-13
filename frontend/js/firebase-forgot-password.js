import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

/* Firebase config (safe to expose) */
const firebaseConfig = {
  apiKey: "AIzaSyApCQg1RTi7Dw--PIuvO1576PSiglYXawI",
  authDomain: "cardify-ai-4511a.firebaseapp.com",
  projectId: "cardify-ai-4511a",
  storageBucket: "cardify-ai-4511a.firebasestorage.app",
  messagingSenderId: "1052786706458",
  appId: "1:1052786706458:web:d77d4ae6282eadbfe9e9a3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
    if (error.code === "auth/user-not-found") {
      message.style.color = "red";
      message.textContent = "No account found with this email.";
    } 
    else if (error.code === "auth/invalid-email") {
      message.style.color = "red";
      message.textContent = "Invalid email address.";
    } 
    else {
      message.style.color = "red";
      message.textContent = "Something went wrong. Please try again.";
    }

    message.style.display = "block";
  }
});