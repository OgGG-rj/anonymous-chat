const socket = io();
const form = document.getElementById('chat-form');
const input = document.getElementById('msg');
const messages = document.getElementById('messages');

// Generate random anonymous ID
const randomID = () => {
    const emojis = ['🧸', '🐸', '🐙', '🦊', '🐵'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const number = Math.floor(Math.random() * 9000 + 1000);
    return emoji + 'User' + number;
};
const userID = randomID();

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', { id: userID, msg: input.value });
        input.value = '';
    }
});

socket.on('chat message', function(data) {
    const item = document.createElement('div');
    item.textContent = `${data.id}: ${data.msg}`;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;

    // Auto-delete after 30 seconds
    setTimeout(() => {
        item.remove();
    }, 30000);
});
