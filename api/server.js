const express = require("express");
const cookieParser = require("cookie-parser");
const connectToMongo = require("./config/database.js");
const cors = require("cors");
const app = express();
const port = 8800;

connectToMongo();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

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
  return connected.find((socket) => socket.connectedId === connectedId);
};

//app.use('/api/items',require('./routes/foodItemRoute'));
app.use("/api/auth/user", require("./routes/userRoutes"));
app.use("/api/auth/admin", require("./routes/canteenRoutes"));
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

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("someone disconnected", connected);
  });
});
