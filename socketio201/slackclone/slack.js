const express = require("express");
const { createServer } = require("http");
const socketio = require("socket.io");
const path = require("path");
const { allNamespaces: namespaces } = require("./data/namespaces");

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
  console.log(`CLiente conectado ${socket.id}`);
  socket.on("clientConnected", () => {
    console.log("Cliente ha emitido clientConnected");
  });
  socket.emit("welcome", "Bienvenido al chat de Slack");
  socket.emit("nsList", namespaces);
});
// Manejo graceful de cierre
process.on("SIGTERM", () => {
  console.log("📊 Cerrando servidor...");
  server.close(() => {
    console.log("✅ Servidor cerrado correctamente");
  });
});
