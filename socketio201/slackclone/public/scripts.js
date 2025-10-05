

const username = prompt("Ingrese su nombre de usuario:");
const password = prompt("Ingrese su contraseña:");

const socket = io("http://localhost:3005");

socket.on("connect", () => {
    console.log("Conectado al servidor Socket.io");
    socket.emit("clientConnected");
});

socket.on("nsList", nsData => {
    nsData.forEach( ns => {
        document.querySelector(".namespaces").innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`;
    });
    
});

socket.on("welcome", msg => {
    console.log(msg);
});