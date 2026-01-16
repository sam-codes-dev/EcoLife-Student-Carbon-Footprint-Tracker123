/* ==========================
   Theme Toggle
========================== */
const themeToggle = document.getElementById("themeToggle");
themeToggle?.addEventListener("click", ()=>{
    if(document.body.classList.contains("dark-theme")){
        document.body.classList.remove("dark-theme");
        localStorage.setItem("theme","light");
    } else {
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme","dark");
    }
});
if(localStorage.getItem("theme")==="dark"){ document.body.classList.add("dark-theme"); }

/* ==========================
   Signup/Login
========================== */
document.getElementById("signupBtn")?.addEventListener("click",()=>{
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    if(name && email && password){
        localStorage.setItem(email, JSON.stringify({name,password}));
        alert("Account created! Login now.");
        window.location.href="login.html";
    } else alert("Please fill all fields.");
});

document.getElementById("loginBtn")?.addEventListener("click",()=>{
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const data = JSON.parse(localStorage.getItem(email));
    if(data && data.password===password){
        localStorage.setItem("currentUser", email);
        window.location.href="dashboard.html";
    } else alert("Invalid credentials");
});

const userEmail = localStorage.getItem("currentUser");
if(userEmail){
    const userData = JSON.parse(localStorage.getItem(userEmail));
    document.getElementById("userName")?.textContent = userData.name;
}

/* ==========================
   Floating AI Chat Box
========================== */
const chatIcon = document.getElementById("aiChatIcon");
const chatBox = document.getElementById("aiChatBox");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const closeChat = document.getElementById("closeChat");

chatIcon?.addEventListener("click", ()=>chatBox.classList.toggle("hidden"));
closeChat?.addEventListener("click", ()=>chatBox.classList.add("hidden"));

const offlineResponses = {
    help: "Commands: daily, score, weekly, money, tips, reviews, contact",
    daily: "Daily Carbon: Enter transport, food, AC, shower to calculate CO2.",
    score: "Eco Score: Shows overall eco-friendliness 0-100.",
    weekly: "Weekly Trend: View 7-day CO2 trend with line chart.",
    money: "Eco Money Saved: Shows CO2 & money saved based on habits.",
    tips: "Tips: Save eco tips according to your score.",
    reviews: "Reviews: Submit and read reviews from other users.",
    contact: "Contact us via email: youremail@gmail.com"
};

chatSend?.addEventListener("click", ()=>handleMessage());
chatInput?.addEventListener("keypress",(e)=>{ if(e.key==="Enter") handleMessage(); });

function handleMessage(){
    const msg = chatInput.value.trim();
    if(!msg) return;
    appendMessage("user", msg);
    chatInput.value="";
    if(navigator.onLine){
        appendMessage("bot", "Online AI: API response placeholder");
    } else {
        const key = msg.toLowerCase();
        appendMessage("bot", offlineResponses[key] || "I didn't understand. Type 'help'.");
    }
}

function appendMessage(sender,msg){
    const div = document.createElement("div");
    div.textContent = sender==="user"? "You: "+msg : "EcoBot 🤖: "+msg;
    div.style.margin="5px 0";
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* ==========================
   Daily Carbon Calculator
========================== */
document.getElementById("calcCarbonBtn")?.addEventListener("click",()=>{
    const transport = parseFloat(document.getElementById("transport")?.value || 0);
    const food = document.getElementById("food")?.value==="veg"? 5: 10;
    const ac = parseFloat(document.getElementById("ac")?.value || 0);
    const shower = parseFloat(document.getElementById("shower")?.value || 0);
    const total = transport*0.21 + food + ac*1.5 + shower*0.08;
    document.getElementById("carbonResult").textContent = "Your CO2 today: "+total.toFixed(2)+" kg";
    const tip = total>20? "Try reducing car travel and AC usage." : "Great job! Keep it up!";
    document.getElementById("carbonTip").textContent = tip;

    if(typeof google !== "undefined"){
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(()=>{
            const data = google.visualization.arrayToDataTable([
                ['Source','CO2'],
                ['Transport', transport*0.21],
                ['Food', food],
                ['AC', ac*1.5],
                ['Shower', shower*0.08]
            ]);
            const chart = new google.visualization.PieChart(document.getElementById('carbonChart'));
            chart.draw(data,{title:'Daily Carbon Emission'});
        });
    }
});

/* ==========================
   Eco Score Calculator
========================== */
document.getElementById("calcEcoBtn")?.addEventListener("click",()=>{
    const transport = parseFloat(document.getElementById("ecoTransport")?.value || 0);
    const food = document.getElementById("ecoFood")?.value==="veg"? 5: 10;
    const ac = parseFloat(document.getElementById("ecoAC")?.value || 0);
    const shower = parseFloat(document.getElementById("ecoShower")?.value || 0);
    const score = 100 - (transport*0.5 + food + ac*2 + shower*0.5);
    document.getElementById("ecoResult").textContent = "Your Eco Score: "+score.toFixed(1)+"/100";
    document.getElementById("ecoTip").textContent = score<70 ? "Try reducing meat, AC, and car travel for a higher score." : "Excellent eco habits! Keep going.";

    if(typeof google !== "undefined"){
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(()=>{
            const data = google.visualization.arrayToDataTable([
                ['Source','Impact'],
                ['Transport', transport*0.5],
                ['Food', food],
                ['AC', ac*2],
                ['Shower', shower*0.5]
            ]);
            const chart = new google.visualization.PieChart(document.getElementById('ecoChart'));
            chart.draw(data,{title:'Eco Score Breakdown', pieHole:0.4});
        });
    }
});

/* ==========================
   Weekly Trend Calculator
========================== */
document.getElementById("calcWeekBtn")?.addEventListener("click",()=>{
    const input = document.getElementById("weekInput")?.value || "";
    const values = input.split(",").map(x=>parseFloat(x.trim()) || 0);
    if(values.length!==7){ alert("Enter exactly 7 values"); return; }

    if(typeof google !== "undefined"){
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(()=>{
            const dataArray = [['Day','CO2']];
            for(let i=0;i<7;i++) dataArray.push(['Day '+(i+1), values[i]]);
            const data = google.visualization.arrayToDataTable(dataArray);
            const chart = new google.visualization.LineChart(document.getElementById('weekChart'));
            chart.draw(data,{title:'Weekly CO2 Trend', curveType:'function', legend:{position:'bottom'}});
        });
    }
});

/* ==========================
   Money Saved Calculator
========================== */
document.getElementById("calcMoneyBtn")?.addEventListener("click",()=>{
    const transport = parseFloat(document.getElementById("moneyTransport")?.value || 0);
    const ac = parseFloat(document.getElementById("moneyAC")?.value || 0);
    const food = parseFloat(document.getElementById("moneyFood")?.value || 0);

    const moneySaved = food*2 + transport*0.5 + ac*1;
    document.getElementById("moneyResult").textContent = "Money Saved & CO2 reduction: $"+moneySaved.toFixed(2);
    document.getElementById("moneyTip").textContent = moneySaved>5 ? "Excellent! Keep these habits." : "Try walking more, reducing AC and meat for more savings.";

    if(typeof google !== "undefined"){
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(()=>{
            const data = google.visualization.arrayToDataTable([
                ['Category','Impact'],
                ['Transport', transport*0.5],
                ['AC', ac*1],
                ['Food', food*2]
            ]);
            const chart = new google.visualization.PieChart(document.getElementById('moneyChart'));
            chart.draw(data,{title:'Money & CO2 Saved'});
        });
    }
});
async function signupUser() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    const res = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const text = await res.text();
    alert(text);
}

async function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const text = await res.text();
    alert(text);
}
