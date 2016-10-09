window.onload = function () {
  var chatWin = document.getElementById("chatWindow");
  var btnChat = document.getElementById("chat");
  var editMessage = document.getElementById("textBox");

  var messageDisplay = document.getElementById("chatBox");
  
  btnChat.onclick = function () {
    if (chatWin.style.display === "none") {
      chatWin.style.display = "inline";
    } else {
      chatWin.style.display = "none";
    }
  };
  editMessage.onkeypress = function (e) {
    if (e.keyCode === 13) {
      console.log(editMessage.value);
      var newMessage;
      var newDiv = document.createElement("div");
      newDiv.innerHTML = "You: " + editMessage.value;
      messageDisplay.appendChild(newDiv);
      editMessage.value = "";
    }
  };
};