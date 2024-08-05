const userRouter = require('express').Router();
const User =require('../models/user')
const bcryptjs = require('bcryptjs')

userRouter.post('/',async( req,res)=>{
    const {username,name,password}= req.body;
    const passwordH= await bcryptjs.hash(password,10);
    const user=new User({
        username,
        name,
        password:passwordH,

    })
    const saved =await user.save()
    res.status(201).json(saved);
})
userRouter.get('/',async(req,response)=>{
    const respo = await User.find({}).populate('blogs',{title:1,author:1,url:1,likes:1})
    response.json(respo)
})

module.exports= userRouter