const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model("User");

module.exports=(req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(403).send({error :" token is expired"});
    }
    const token = authorization.replace("Bearer ","");
    console.log(token);
    jwt.verify(token,process.env.jwt_secret,(err,payload)=>{
        if(err){
            return res.status(403).json({error: "Invalid token"});
        }
        const {_id} = payload;
        User.findById(_id).then(userdata=>{
            req.user = userdata;
            console.log("userdata",userdata);
            next();
            
        })
    })
}