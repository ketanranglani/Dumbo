const User = require('../models/user')
const jwt= require('jsonwebtoken')
const tokenExtractor=async(req,res,next)=>{
    
    const auth = await req.get('authorization')
    
    req.token= auth&&auth.startsWith('Bearer') ? auth.replace('Bearer ','') : null

    next();
}
const userExtractor=async(req,res,next)=>{
    const decode =jwt.verify(req.token,process.env.secret_jwt);
    req.user=await User.findById(decode.id)

    
    
    next()
}
module.exports={ tokenExtractor ,userExtractor}