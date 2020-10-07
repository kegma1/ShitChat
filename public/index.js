const socket = io("http://localhost:3000");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");
const roomContainer = document.getElementById("room-container");

if (messageForm != null) {
  const name = prompt("what is your name?");
  appendMessage("You joined");
  socket.emit("new-user", roomName, name);

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`<b>You:</b> ${message}`);
    socket.emit("send-chat-message", roomName, message);
    messageInput.value = "";
  });
}

socket.on("room-created", room => {
  const roomElement = document.createElement("p")
  roomElement.innerHTML = room
  const roomLink = document.createElement("a")
  roomLink.href = `/${room}`
  roomLink.innerText = "join"
  const roomInfo = document.createElement("div")
  roomInfo.append(roomElement)
  roomInfo.append(roomLink)
  roomContainer.append(roomInfo)
})

socket.on("chat-message", (data) => {
  appendMessage(`<b>${data.name}:</b> ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  messageContainer.appendChild(messageElement);
}
