/* =================================================
   THEME TOGGLE (works on all pages)
================================================= */
const themeToggle = document.getElementById("themeToggle");
themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});

/* =================================================
   SIGN UP LOGIC
================================================= */
if (location.pathname.includes("signup.html")) {
    document.getElementById("signupBtn")?.addEventListener("click", () => {
        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value.trim();

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        localStorage.setItem(email, JSON.stringify({ name, password }));
        alert("Signup successful!");

        window.location.href = "login.html";
    });
}

/* =================================================
   LOGIN LOGIC
================================================= */
if (location.pathname.includes("login.html")) {
    document.getElementById("loginBtn")?.addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        const user = JSON.parse(localStorage.getItem(email));

        if (!user || user.password !== password) {
            alert("Invalid email or password");
            return;
        }

        localStorage.setItem("currentUser", email);
        window.location.href = "dashboard.html";
    });
}

/* =================================================
   DASHBOARD AUTH CHECK
================================================= */
if (location.pathname.includes("dashboard.html")) {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        window.location.href = "login.html";
    }
}

/* =================================================
   AI CHAT
================================================= */
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
    if (!input || !input.value.trim()) return;

    const box = document.getElementById("chatMessages");
    box.innerHTML += `<p><b>You:</b> ${input.value}</p>`;
    box.innerHTML += `<p><b>EcoBot:</b> I am online. AI API will be connected soon 🤖</p>`;
    input.value = "";
    box.scrollTop = box.scrollHeight;
}

/* =================================================
   ECO SEARCH
================================================= */
const ecoSearchIcon = document.getElementById("ecoSearchIcon");
const ecoSearchBox = document.getElementById("ecoSearchBox");

ecoSearchIcon?.addEventListener("click", () => {
    ecoSearchBox.classList.toggle("hidden");
});

function closeEcoSearch() {
    ecoSearchBox?.classList.add("hidden");
}


