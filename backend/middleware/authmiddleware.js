const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({message : "Access denied. No token provided."})
    }

    try{
        const decode = jwt.verify(token.replace("Bearer ",""),process.env.JWT_TOKEN);
        req.user = decode;
        next();
    }
    catch(error){
        res.status(400).json({message : "Invalid Token", error : error});
    }
}

module.exports = authMiddleware;