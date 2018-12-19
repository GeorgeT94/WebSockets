var socket = new WebSocket( "ws://localhost:1337");

let history = [];

socket.onopen = function(event) {
    console.log("Connection established");
    // Display user friendly messages for the successful establishment of connection
    var label = document.getElementById("status");
    label.innerHTML = "Connection established";
    console.log("on open event");
    console.log(event);
 }

 socket.onmessage = function(event) {
    console.log("on message triggered")

    onMessage(event)
 };

 socket.onclose = function(event) {
    console.log("Error occurred.");
     
    // Inform the user about the error.
    var label = document.getElementById("status");
    label.innerHTML = "Error: " + event;

    if (event.code != 1000) {
         
        if (!navigator.onLine) {
           alert("You are offline. Please connect to the Internet and try again.");
        }
     }
 }

 function sendMessage() {
    var message = document.getElementById("text-input").value;

    socket.send(message)

    console.log("message sent : " + message)
 }

 function writeById(message, id){
    var element = document.getElementById("response");
    element.innerHTML = message;
 }

 function onMessage(event) {
    console.log("onMessage()")
    console.log(event)
    jsonData = JSON.parse(event.data);

    console.log("history inside onMessage : " + history)
    if(jsonData.type === "history"){ 
        history = jsonData.data;
        renderChat();
    }
    if(jsonData.type === "message"){ 
        history.push(jsonData.data.text);
        updateChat();
    }    
    console.log("onMessage event data" )
    console.log(event.data)
    writeById('<span style = "color: blue;">RESPONSE: ' +
       event.data+'</span>', "response"); 
       //socket.close();
 }
 
function updateChat(){
    let chatbox = document.getElementById("chatbox")

    chatbox.innerHTML += "<div>" + history[history.length -1] +  "<div>";
}

function renderChat(){
    let chatbox = document.getElementById("chatbox")

    for(i=0; i<history.length; i++){
        chatbox.innerHTML += "<div>" + history[i].text + "<div>"
    }
}