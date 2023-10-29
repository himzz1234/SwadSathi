const express = require("express");
const cookieParser = require("cookie-parser");
const connectToMongo = require("./config/database.js");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app)
const port = 8800;

const io = require("socket.io")(server, {
  perMessageDeflate: false,
  cors: {
    origin: "*",
  }
})

connectToMongo();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

let connectedUsers = []
let connectedCanteens = []

const addnewuser = (userId, socketId) => {
  !connectedUsers.some((user)=>user.userId === userId) && connectedUsers.push({userId, socketId})
}

const addNewCanteen = (canteenId, socketId) => {
  !connectedCanteens.some((canteen)=>canteen.canteenId === canteenId) && connectedCanteens.push({canteenId, socketId})
}

const getUser = (userId) => {
  return connectedUsers.find((user)=>user.userId === userId)
}

io.on("connection", (socket)=>{
  socket.on("newuser", (userId)=>{
    addnewuser(userId, socket.id)
  })
  
  socket.on("disconnect", ()=>{})
})

//app.use('/api/items',require('./routes/foodItemRoute'));
app.use("/api/auth/user", require("./routes/userRoutes"));
app.use("/api/auth/admin", require("./routes/canteenRoutes"));
app.use("/api/orders", require("./routes/orderRoutes.js"))

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
