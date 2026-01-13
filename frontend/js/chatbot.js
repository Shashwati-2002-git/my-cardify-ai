// Make function GLOBAL
window.initChatbot = function () {
  const icon = document.getElementById("chatbot-icon");
  const box = document.getElementById("chatbot-box");
  const input = document.getElementById("chatbot-input");
  const messages = document.getElementById("chatbot-messages");

  // Safety check
  if (!icon || !box || !input || !messages) {
    console.error("❌ Chatbot elements not found");
    return;
  }

  icon.onclick = () => {
    box.style.display = box.style.display === "flex" ? "none" : "flex";
  };

  input.onkeypress = async (e) => {
    if (e.key === "Enter" && input.value.trim()) {
      const userText = input.value.trim();
      input.value = "";

      addMessage("You", userText);

      try {
        const res = await fetch("/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText })
        });

        const data = await res.json();
        addMessage("Bot", data.reply);
      } catch {
        addMessage("Bot", "Sorry, something went wrong.");
      }
    }
  };

  function addMessage(sender, text) {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${sender}:</strong> ${text}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  console.log("✅ Chatbot initialized");
};