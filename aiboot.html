<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AI Bot</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #111;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .chatbox {
      width: 350px;
      background: #1c1c1c;
      border-radius: 10px;
      padding: 15px;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
    }
    .messages {
      height: 300px;
      overflow-y: auto;
      border: 1px solid #333;
      padding: 10px;
      margin-bottom: 10px;
    }
    .user {
      color: #4caf50;
      margin-bottom: 5px;
    }
    .bot {
      color: #00bcd4;
      margin-bottom: 10px;
    }
    input {
      width: 75%;
      padding: 8px;
      border-radius: 5px;
      border: none;
      outline: none;
    }
    button {
      width: 22%;
      padding: 8px;
      border-radius: 5px;
      border: none;
      background: #4caf50;
      color: #fff;
      cursor: pointer;
    }
  </style>
</head>
<body>

<div class="chatbox">
  <h3>AI Bot</h3>
  <div class="messages" id="messages"></div>
  <input type="text" id="userInput" placeholder="Type your message..." />
  <button onclick="sendMessage()">Send</button>
</div>

<script>
  async function sendMessage() {
    const input = document.getElementById("userInput");
    const messages = document.getElementById("messages");
    const userText = input.value.trim();

    if (!userText) return;

    // Show user message
    messages.innerHTML += <div class="user"><b>You:</b> ${userText}</div>;
    input.value = "";
    messages.scrollTop = messages.scrollHeight;

    try {
      // 🔴 REPLACE with your AI API endpoint & key
      const response = await fetch("https://api.your-ai-provider.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_API_KEY_HERE"
        },
        body: JSON.stringify({
          message: userText
        })
      });

      const data = await response.json();
      const botReply = data.reply || "No response from AI.";

      // Show bot message
      messages.innerHTML += <div class="bot"><b>Bot:</b> ${botReply}</div>;
      messages.scrollTop = messages.scrollHeight;

    } catch (error) {
      messages.innerHTML += <div class="bot"><b>Bot:</b> Error connecting to AI.</div>;
      console.error(error);
    }
  }
</script>

</body>
</html>
