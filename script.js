/* ==========================
   THEME TOGGLE
========================== */
const themeToggle = document.getElementById("themeToggle");
themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme",
        document.body.classList.contains("dark-theme") ? "dark" : "light"
    );
});
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
}

/* ==========================
   SIGNUP
========================== */
document.getElementById("signupBtn")?.addEventListener("click", () => {
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    if (localStorage.getItem(email)) {
        alert("Account already exists. Please login.");
        return;
    }

    localStorage.setItem(email, JSON.stringify({ name, password }));
    alert("Account created successfully!");
    window.location.href = "login.html";
});

/* ==========================
   LOGIN
========================== */
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

/* ==========================
   DASHBOARD USER NAME
========================== */
const currentUser = localStorage.getItem("currentUser");
if (currentUser) {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    const userNameEl = document.getElementById("userName");
    if (userNameEl) userNameEl.textContent = userData.name;
}

/* ==========================
   AI CHAT (OFFLINE + ONLINE)
========================== */
const chatIcon = document.getElementById("aiChatIcon");
const chatBox = document.getElementById("aiChatBox");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");

chatIcon?.addEventListener("click", () => chatBox.classList.toggle("hidden"));

function sendChat() {
    const msg = chatInput.value.trim();
    if (!msg) return;

    addMsg("You", msg);
    chatInput.value = "";

    if (navigator.onLine) {
        addMsg("EcoBot 🤖", "Online AI coming soon. You are connected.");
    } else {
        addMsg("EcoBot 🤖", "Offline help: Try calculators, dashboard, or tips.");
    }
}

function addMsg(sender, text) {
    const div = document.createElement("div");
    div.textContent = `${sender}: ${text}`;
    chatMessages.appendChild(div);
}

/* ==========================
   CARBON CALCULATOR
========================== */
document.getElementById("calcCarbonBtn")?.addEventListener("click", () => {
    const transport = Number(document.getElementById("transport").value || 0);
    const food = document.getElementById("food").value === "veg" ? 5 : 10;
    const ac = Number(document.getElementById("ac").value || 0);
    const shower = Number(document.getElementById("shower").value || 0);

    const total = transport * 0.21 + food + ac * 1.5 + shower * 0.08;

    document.getElementById("carbonResult").textContent =
        `Your CO₂ Today: ${total.toFixed(2)} kg`;

    document.getElementById("carbonTip").textContent =
        total > 20 ? "Reduce AC & car usage" : "Great eco habits!";
});
// ==============================
// SIGN UP
// ==============================
async function signupUser() {
    const name = document.getElementById('signupName')?.value;
    const email = document.getElementById('signupEmail')?.value;
    const password = document.getElementById('signupPassword')?.value;

    const res = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const text = await res.text();
    alert(text);
}

// ==============================
// LOGIN
// ==============================
async function loginUser() {
    const email = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;

    const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (res.ok) {
        window.location.href = "chat.html";
    } else {
        const text = await res.text();
        alert(text);
    }
}

// ==============================
// AI CHAT
// ==============================
async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input?.value.trim();
    if (!message) return;

    addMessage("You", message);
    input.value = "";

    addMessage("AI", "Typing...");

    const res = await fetch(
        "https://YOUR-VERCEL-URL/chat",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        }
    );

    const data = await res.json();
    updateLastMessage("AI", data.reply);
}

// ==============================
// CHAT HELPERS
// ==============================
function addMessage(sender, text) {
    const chatBox = document.getElementById("chatBox");
    if (!chatBox) return;
    const div = document.createElement("div");
    div.innerText = `${sender}: ${text}`;
    chatBox.appendChild(div);
}

function updateLastMessage(sender, text) {
    const chatBox = document.getElementById("chatBox");
    if (!chatBox) return;
    chatBox.lastChild.innerText = `${sender}: ${text}`;
}
// script.js

const BACKEND_URL = "https://backend-neon-nine-36.vercel.app";

// SIGN UP
async function signupUser() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const res = await fetch(`${BACKEND_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const text = await res.text();
        alert(text);
    } catch (err) {
        alert("Signup failed");
        console.error(err);
    }
}

// LOGIN
async function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch(`${BACKEND_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const text = await res.text();
        alert(text);
    } catch (err) {
        alert("Login failed");
        console.error(err);
    }
}


