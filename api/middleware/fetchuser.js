var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
//const JWT_secret = 'akshay@123';

const fetchuser = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token."});
    }
    try{
        const data = jwt.verify(token, process.env.JWT_secret);
        req.user = data.user;
        next();
    }
    catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token."})
    }
}

module.exports = fetchuser;