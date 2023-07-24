const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectToMongo = require('./database');


var cors = require('cors');

connectToMongo();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//app.use('/api/items',require('./routes/foodItemRoute'));
app.use('/api/auth/user',require('./routes/userRoute'));
app.use('/api/auth/admin',require('./routes/canteenRoute'));

app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
})