const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "https://live-chat-app-drab.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", ({ room, username }) => {
    socket.join(room);
    socket.username = username;
    socket.room = room;

    io.to(room).emit("message", {
      user: "System",
      text: `${username} joined the room.`,
    });
  });

  socket.on("send_message", (msg) => {
    io.to(socket.room).emit("message", {
      user: socket.username,
      text: msg,
    });
  });

  socket.on("disconnect", () => {
    if (socket.room && socket.username) {
      io.to(socket.room).emit("message", {
        user: "System",
        text: `${socket.username} left the room.`,
      });
    }
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
