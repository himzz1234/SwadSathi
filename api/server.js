const express = require("express");
const cookieParser = require("cookie-parser");
const connectToMongo = require("./database");
const cors = require("cors");
const app = express();
const port = 3000;

connectToMongo();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//app.use('/api/items',require('./routes/foodItemRoute'));
app.use("/api/auth/user", require("./routes/userRoute"));
app.use("/api/auth/admin", require("./routes/canteenRoute"));

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
