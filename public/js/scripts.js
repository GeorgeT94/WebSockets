var socket = new WebSocket( "ws://echo.websocket.org");

socket.onopen = function(event) {
    console.log("Connection established");
    // Display user friendly messages for the successful establishment of connection
    var label = document.getElementById("status");
    label.innerHTML = "Connection established";
 }

 socket.onmessage = function(event) {
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
    writeById('<span style = "color: blue;">RESPONSE: ' +
       event.data+'</span>', "response"); 
       //socket.close();
 } 

