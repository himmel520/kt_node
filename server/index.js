const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const router = require("./src/router");
const { addUser, findUser, getRoomUsers, removeUser } = require("./src/users");

const app = express();
app.use(cors({ origin: "*" }));
app.use(router);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room, color }) => {
    socket.join(room);

    const { user, isExist } = addUser({ name, room, color });

    const userMessage = isExist
      ? `${user.name}, here you go again`
      : `${user.name} joined the ${user.room}`;

    socket.emit("message", {
      data: { user: { name: "admin", color: "#566573" }, message: userMessage },
    });

    socket.broadcast.to(user.room).emit("message", {
      data: { user: { name: "admin", color: "#566573" }, message: `${user.name} has joined` },
    });

    io.to(user.room).emit("room", {
      data: { users: getRoomUsers(user.room) },
    });
  });

  socket.on("sendMessage", ({ message, params }) => {
    const user = findUser(params);

    if (user) {
      io.to(user.room).emit("message", { data: { user, message } });
    }
  });

  socket.on("leftRoom", ({ params }) => {
    const user = removeUser(params);
  
    if (user) {
      const { room, name } = user;
  
      io.to(room).emit("message", {
        data: { user: { name: "admin", color: "#566573" }, message: `${name} has left` },
      });
      
      io.to(room).emit("room", {
        data: { users: getRoomUsers(room) },
      });
    }
  });

  io.on("disconnect", () => {
    console.log("Disconnect");
  });
});

server.listen(3001, () => {
  console.log("Start server");
});
