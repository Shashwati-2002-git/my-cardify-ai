document.addEventListener("DOMContentLoaded", () => {
  const profileIcon = document.getElementById("profile-icon");
  const profileMenu = document.getElementById("profile-menu");
  const loginBtn = document.getElementById("login-btn");

  if (!profileIcon || !profileMenu || !loginBtn) {
    console.error("❌ Header elements not found");
    return;
  }

  // Toggle menu on profile click
  profileIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    profileMenu.style.display =
      profileMenu.style.display === "block" ? "none" : "block";
  });

  // Redirect to login page
  loginBtn.addEventListener("click", () => {
    window.location.href = "/login"; // adjust path if needed
  });

  // Close menu when clicking outside
  document.addEventListener("click", () => {
    profileMenu.style.display = "none";
  });
});