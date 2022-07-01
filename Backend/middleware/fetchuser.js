var jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.TOKEN;

const fetchuser=( req ,res , next )=>{
//get the user from the jwt token and add id to req

    const token = req.header('auth-token');
    if(!token){
        res.status(500).send("some error occured 1");
    }
    try {
        const data =jwt.verify(token , JWT_SECRET);
        req.user= data.user;
        next()    
        
    } catch (error) {
        res.status(500).send("some error occured 2");
        console.log(error);
    }
  
}
module.exports = fetchuser;