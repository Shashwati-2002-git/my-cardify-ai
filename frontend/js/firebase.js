import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyApCQg1RTi7Dw--PIuvO1576PSiglYXawI",
  authDomain: "cardify-ai-4511a.firebaseapp.com",
  projectId: "cardify-ai-4511a",
  storageBucket: "cardify-ai-4511a.firebasestorage.app",
  messagingSenderId: "1052786706458",
  appId: "1:1052786706458:web:d77d4ae6282eadbfe9e9a3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);