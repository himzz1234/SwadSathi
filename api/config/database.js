const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(MONGO_URI) 
        console.log('MongoDB connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectToMongo;