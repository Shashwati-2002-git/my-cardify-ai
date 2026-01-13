import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

/* 🔐 Firebase config (SAFE to expose) */
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
    // ✅ Handle existing account case
    if (error.code === "auth/email-already-in-use") {
      message.textContent = "An account with this email already exists.";
    } 
    // Optional extra handling
    else if (error.code === "auth/weak-password") {
      message.textContent = "Password should be at least 6 characters.";
    } 
    else {
      message.textContent = "Something went wrong. Please try again.";
    }

    message.style.display = "block";
  }
});