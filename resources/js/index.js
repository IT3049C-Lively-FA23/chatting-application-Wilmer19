//References to the HTML elements
const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const saveButton = document.getElementById("save-username-button");
const switchButton = document.getElementById("switch-button");

const serverURL = `https://it3049c-chat.fly.dev/messages`;


function fetchMessages() {
    return fetch(serverURL)
        .then( response => response.json())
}

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
      return `
      <div class="mine messages">
          <div class="message">
              ${message.text}
          </div>
          <div class="sender-info">
              ${formattedTime}
          </div>
      </div>
      `
  } else {
      return `
          <div class="yours messages">
              <div class="message">
                  ${message.text}
              </div>
              <div class="sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
      `
  }
}

async function updateMessages() {
  // Fetch Messages
  const messages = await fetchMessages();
  // Loop over the messages. Inside the loop we will
      // get each message
      // format it
      // add it to the chatbox
  let formattedMessages = "";
  messages.forEach(message => {
      formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
}

updateMessages();
const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

function sendMessages(username, text) {
  const newMessage = {
      sender: username,
      text: text,
      timestamp: new Date()
  }

  fetch (serverURL, {
      method: `POST`,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
  });
}

sendButton.addEventListener("click", function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  sendMessages(sender,message);
  myMessage.value = "";
});

var usernameInput = document.getElementById("my-name-input"),
userData = {
    userName: 'Billy Bob',
    userDescription: 'Another user'
},
localData;

localStorage.setItem('userData', JSON.stringify(userData));

localData = JSON.parse(localStorage.getItem('userData'));

console.log(localData);
console.log(localStorage.getItem('userData'));

usernameInput.innerHTML = localData.userName;

//dark mode function
switchButton.addEventListener("click", function(switchButtonClickEvent){
switchButtonClickEvent.preventDefault();
    let element = document.body;
    element.classList.toggle("dark");
});
