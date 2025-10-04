const express = require("express");
const { createServer } = require("http");
const socketio = require("socket.io");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.send("Hola desde el servidor Express");
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "/public")));

const PORT = process.env.PORT || 3005;

const server = createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
    //path: "/socket.io" por defecto es "/socket.io" pero se puede cambiar
    //serverClient: false por defecto es true, si es true sirve el cliente de socket.io en /socket.io/socket.io.js sino no lo sirve
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`
🔒 Servidor Socket.io SEGURO ejecutándose
🌐 Puerto: ${PORT}
🐳 Entorno: Docker
📦 Socket.io: v4.7.5 (versión segura)
  `);
});

io.on("connection", socket => {
  // este socket es a quien se le envia el mensaje o quien envia el mensaje
  console.log(`Nuevo cliente conectado: ${socket.id}`);
  // en ws se usa send para enviar mensajes, en socketio se usa emit
  // con io se envia a todos los clientes conectados

  socket.on("messageFromClient", ({ id, msg }) => {
    console.log("Mensaje del cliente:");
    console.log({ id, msg });
    io.emit("serverMessage", { id, msg }); // io.emit envia a todos los clientes conectados
  });
});
// Manejo graceful de cierre
process.on("SIGTERM", () => {
  console.log("📊 Cerrando servidor...");
  server.close(() => {
    console.log("✅ Servidor cerrado correctamente");
  });
});
