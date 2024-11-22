const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 8800;
const app = express();
const Agenda = require("@hokify/agenda").Agenda;
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);
let connected = [];

/// User connection
const addnewuser = (connectedId, socketId) => {
  !connected.some((user) => user.connectedId === connectedId) &&
    connected.push({ connectedId, socketId });
};

const removeUser = (socketId) => {
  connected = connected.filter((user) => user.socketId !== socketId);
};

const getSocket = (connectedId) => {
  return connected.find((user) => user.connectedId === connectedId);
};

//app.use('/api/items',require('./routes/foodItemRoute'));
app.use("/api/auth/user", require("./routes/userRoutes"));
app.use("/api/auth/canteen", require("./routes/canteenRoutes"));
app.use("/api/orders", require("./routes/orderRoutes.js"));

const server = app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

const io = require("socket.io")(server, {
  perMessageDeflate: false,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("newconnection", (connectedId) => {
    addnewuser(connectedId, socket.id);
    console.log("Someone connected!", connected);
  });

  socket.on("order-placed", (data) => {
    const canteenSocket = getSocket(data.receiverId);
    if (canteenSocket) {
      io.to(canteenSocket.socketId).emit("new-order", { order: data.order });
    }
  });

  socket.on("order-accept", (data) => {
    const userSocket = getSocket(data.receiverId);
    if (userSocket) {
      io.to(userSocket.socketId).emit("order-accepted", {
        message: data.message,
        order: data.order,
      });
    }
  });

  socket.on("order-decline", (data) => {
    const userSocket = getSocket(data.receiverId);
    if (userSocket) {
      io.to(userSocket.socketId).emit("order-declined", {
        message: data.message,
        order: data.order,
      });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("someone disconnected", connected);
  });
});
