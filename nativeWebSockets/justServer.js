

const http = require("http");
const WebSocket = require("ws");

const port = 3000;
const server = http.createServer((req, res) => {
    console.log({req});
    res.end("Servidor HTTP funcionado correctamente");
}); // aqui se ponen los escuchas
    
const wsServer = new WebSocket.WebSocketServer({server});

wsServer.on("connection", (ws,req) => {

    console.log({ws,req});
    console.log("Cliente conectado");

    ws.on("message", message => {
        console.log("Mensaje recibido del cliente:", message.toString());
        ws.send(`Mensaje recibido: ${message.toString()}`);
    });

});

server.listen(port,() =>  console.log(`Servidor escuchando solicitudes en puerto ${port}`));