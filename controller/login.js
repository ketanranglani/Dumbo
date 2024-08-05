
const jwt= require('jsonwebtoken')

const bcryptjs = require('bcryptjs')
const loginRouter = require('express').Router()
const User =require('../models/user')

loginRouter.post('/',async(req,res)=>{
    const {username,password}= req.body;
    const user = await User.findOne({username});
    const passwordHash= await bcryptjs.compare(password,user.password) 
    console.log((user && passwordHash))
    if(!(user && passwordHash)){
        return res.status(401).json({
            error: 'Invalid credentials'
        })
    }
    const userDetails={
        username:user.username,
        id:user._id
        
    }
    const token = jwt.sign(userDetails,process.env.secret_jwt,{expiresIn:'1h'});
    res.status(200).send({token,username:user.username,name:user.name})
})

module.exports= loginRouter