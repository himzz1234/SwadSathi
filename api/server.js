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

//app.use('/api/items',require('./routes/foodItemRoute'));
app.use("/api/auth/user", require("./routes/userRoutes"));
app.use("/api/auth/admin", require("./routes/canteenRoutes"));
app.use("/api/orders", require("./routes/orderRoutes.js"))

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
