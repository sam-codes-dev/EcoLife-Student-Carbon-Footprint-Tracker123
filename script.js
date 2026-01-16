/* ================= THEME ================= */
const themeToggle = document.getElementById("themeToggle");
themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});

/* ================= AI CHAT ================= */
const aiChatIcon = document.getElementById("aiChatIcon");
const aiChatBox = document.getElementById("aiChatBox");
const closeChat = document.getElementById("closeChat");

aiChatIcon?.addEventListener("click", () => {
    aiChatBox.classList.toggle("hidden");
});

closeChat?.addEventListener("click", () => {
    aiChatBox.classList.add("hidden");
});

function sendChat() {
    const input = document.getElementById("chatInput");
    if (!input.value.trim()) return;

    const box = document.getElementById("chatMessages");
    box.innerHTML += `<p><b>You:</b> ${input.value}</p>`;
    box.innerHTML += `<p><b>EcoBot:</b> I am online. AI API will be connected soon 🤖</p>`;
    input.value = "";
}

/* ================= ECO SEARCH ================= */
const ecoSearchIcon = document.getElementById("ecoSearchIcon");
const ecoSearchBox = document.getElementById("ecoSearchBox");

ecoSearchIcon?.addEventListener("click", () => {
    ecoSearchBox.classList.toggle("hidden");
});

function closeEcoSearch() {
    ecoSearchBox.classList.add("hidden");
}



