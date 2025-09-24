const express = require('express');
const { createServer } = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();


app.get('/', (req, res) => {
 res.send("Hola desde el servidor Express");
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '/public')));



const PORT = process.env.PORT || 3000;

const server = createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`
🔒 Servidor Socket.io SEGURO ejecutándose
🌐 Puerto: ${PORT}
🐳 Entorno: Docker
📦 Socket.io: v4.7.5 (versión segura)
  `);
});


io.on('connection', socket => {
  console.log(`Nuevo cliente conectado: ${socket.id}`);
  // en ws se usa send para enviar mensajes, en socketio se usa emit
  io.emit("serverMessage", {
    msg: "Bienvenido al servidor Socket.io",
    id: socket.id
  });

  io.on("messageFromClient", data => {
    console.log(data);
  });

});
// Manejo graceful de cierre
process.on('SIGTERM', () => {
  console.log('📊 Cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
  });
});
