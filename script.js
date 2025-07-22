const socket = io();

// Generate or get persistent random username
function getOrCreateUsername() {
    let username = localStorage.getItem("anon_username");
    if (!username) {
        username = "Anon" + Math.floor(Math.random() * 10000);
        localStorage.setItem("anon_username", username);
    }
    return username;
}

const username = getOrCreateUsername();

const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== "") {
        socket.emit("chat message", { user: username, text });
        input.value = "";
    }
});

socket.on("chat message", function (msg) {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});
