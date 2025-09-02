const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let rooms = {};

io.on("connection", (socket) => {
  console.log("Usuário conectado:", socket.id);

  socket.on("get_rooms", (callback) => {
    callback(Object.keys(rooms));
  });

  socket.on("create_room", (roomName, callback) => {
    if (!rooms[roomName]) {
      rooms[roomName] = [];
    }

    io.emit("rooms_list", Object.keys(rooms));
    callback({ success: true });
  });

  socket.on("join_room", (roomName, username, callback) => {
    socket.join(roomName);
    callback({ success: true, history: rooms[roomName] || [] });
  });

  socket.on("send_message", ({ roomName, user, message }) => {
    const msg = { user, message, time: new Date().toISOString() };
    if (!rooms[roomName]) rooms[roomName] = [];
    rooms[roomName].push(msg);

    io.to(roomName).emit("receive_message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Servidor Socket.IO rodando na porta 4000");
});
