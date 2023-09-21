//References to the HTML elements
const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

function updateMessages() {
  // Fetch Messages
  // Loop over the messages. Inside the loop we will
      // get each message
      // format it
      // add it to the chatbox
}

const serverURL = `https://it3049c-chat.fly.dev/messages`;

function fetchMessages() {
    return fetch(serverURL)
        .then( response => response.json())
}