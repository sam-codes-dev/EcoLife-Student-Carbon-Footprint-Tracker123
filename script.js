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
   BACKEND URL
========================== */
const BACKEND_URL = "https://backend-neon-nine-36.vercel.app";

/* ==========================
   PAGE DETECTION
========================== */
const page = window.location.pathname.split("/").pop();

/* ==========================
   SIGNUP
========================== */
if(page === "signup.html"){
    document.getElementById("signupBtn")?.addEventListener("click", async () => {
        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value.trim();

        if(!name || !email || !password){ alert("Fill all fields"); return; }

        localStorage.setItem(email, JSON.stringify({name,password}));
        localStorage.setItem("currentUser", email);

        try{
            await fetch(`${BACKEND_URL}/signup`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({name,email,password})
            });
        }catch(err){ console.error(err); }

        window.location.href = "dashboard.html";
    });
}

/* ==========================
   LOGIN
========================== */
if(page === "login.html"){
    document.getElementById("loginBtn")?.addEventListener("click", async () => {
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if(!email || !password){ alert("Fill all fields"); return; }

        const user = JSON.parse(localStorage.getItem(email));
        if(user && user.password === password){
            localStorage.setItem("currentUser", email);
            window.location.href="dashboard.html";
            return;
        }

        try{
            const res = await fetch(`${BACKEND_URL}/login`, {
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({email,password})
            });

            if(res.ok){
                localStorage.setItem("currentUser", email);
                window.location.href="dashboard.html";
            } else {
                alert(await res.text());
            }
        }catch(err){ alert("Login failed"); console.error(err); }
    });
}

/* ==========================
   DASHBOARD
========================== */
if(page === "dashboard.html"){
    const currentUser = localStorage.getItem("currentUser");
    if(!currentUser) window.location.href="login.html";
    else{
        const userData = JSON.parse(localStorage.getItem(currentUser));
        const userNameEl = document.querySelector("header h2");
        if(userNameEl) userNameEl.textContent = `Welcome, ${userData.name} 🌱`;
    }
}

/* ==========================
   CALCULATORS
========================== */
// Carbon Calculator
document.getElementById("calcCarbonBtn")?.addEventListener("click", () => {
    const t = Number(document.getElementById("transport")?.value||0);
    const f = document.getElementById("food")?.value==="veg"?5:10;
    const ac = Number(document.getElementById("ac")?.value||0);
    const s = Number(document.getElementById("shower")?.value||0);
    const total = t*0.21 + f + ac*1.5 + s*0.08;

    document.getElementById("carbonResult").textContent=`Your CO₂ Today: ${total.toFixed(2)} kg`;

    // Chart
    const ctx = document.getElementById("carbonChart")?.getContext("2d");
    if(ctx){
        new Chart(ctx,{
            type:'line',
            data:{
                labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
                datasets:[{
                    label:'CO₂ Emission (kg)',
                    data:[total,total,total,total,total,total,total],
                    borderColor:'green',
                    fill:false
                }]
            }
        });
    }
});

// Money Weekly Calculator
document.getElementById("calcMoneyBtn")?.addEventListener("click", () => {
    const daily = Number(document.getElementById("moneyDaily")?.value||0);
    const weekly = daily*7;
    document.getElementById("moneyResult").textContent=`Money saved weekly: ₹${weekly}`;

    const ctx = document.getElementById("moneyChart")?.getContext("2d");
    if(ctx){
        new Chart(ctx,{
            type:'line',
            data:{
                labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
                datasets:[{
                    label:'Money Saved (₹)',
                    data:Array(7).fill(daily),
                    borderColor:'blue',
                    fill:false
                }]
            }
        });
    }
});

// Water & Energy Calculator
document.getElementById("calcWaterEnergyBtn")?.addEventListener("click", () => {
    const water = Number(document.getElementById("waterDaily")?.value||0);
    const energy = Number(document.getElementById("energyDaily")?.value||0);
    const score = (water*0.05 + energy*0.3).toFixed(2);
    document.getElementById("waterEnergyResult").textContent=`Impact Score: ${score}`;

    const ctx = document.getElementById("waterEnergyChart")?.getContext("2d");
    if(ctx){
        new Chart(ctx,{
            type:'line',
            data:{
                labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
                datasets:[{
                    label:'Impact Score',
                    data:Array(7).fill(score),
                    borderColor:'orange',
                    fill:false
                }]
            }
        });
    }
});

// Eco Score Calculator
document.getElementById("calcEcoBtn")?.addEventListener("click", () => {
    const points = Number(document.getElementById("ecoPoints")?.value||0);
    const score = Math.min(points*10,100);
    document.getElementById("ecoScoreResult").textContent=`Eco Score: ${score}`;

    const ctx = document.getElementById("ecoChart")?.getContext("2d");
    if(ctx){
        new Chart(ctx,{
            type:'line',
            data:{
                labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
                datasets:[{
                    label:'Eco Score',
                    data:Array(7).fill(score),
                    borderColor:'purple',
                    fill:false
                }]
            }
        });
    }
});

/* ==========================
   AI CHATBOX
========================== */
const chatIcon = document.getElementById("aiChatIcon");
const chatBox = document.getElementById("aiChatBox");
const closeChat = document.getElementById("closeChat");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

const API_KEY = "AIzaSyBTUsfAEpavRKLuNOdWbkSDtew5ohFsIpY";
const CX = "5167dd19fa495415f";

chatIcon?.addEventListener("click",()=>{ chatBox.classList.toggle("hidden"); });
closeChat?.addEventListener("click",()=>{ chatBox.classList.add("hidden"); });

sendBtn?.addEventListener("click", async ()=>{
    const msg = chatInput.value.trim();
    if(!msg) return;
    addMsg("You", msg);
    chatInput.value="";
    addMsg("EcoBot 🤖","Searching online...");

    try{
        const res = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(msg)}`);
        const data = await res.json();
        let reply="I couldn't find anything 😕";
        if(data.items && data.items.length>0) reply=data.items[0].snippet;
        updateLastMessage("EcoBot 🤖", reply);
    }catch(err){
        console.error(err);
        updateLastMessage("EcoBot 🤖","Error fetching info from Google 😕");
    }
});

function addMsg(sender,text){
    const div=document.createElement("div");
    div.textContent=`${sender}: ${text}`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function updateLastMessage(sender,text){
    if(chatMessages.lastChild) chatMessages.lastChild.textContent=`${sender}: ${text}`;
}


