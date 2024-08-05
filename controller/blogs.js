const blogRouter = require('express').Router();
const Blog = require('../models/note');
const User = require('../models/user')
const jwt = require('jsonwebtoken')





//To fetch all the data
blogRouter.get('/', async (request, response) => {
  const blogs= await Blog.find({})
  response.json(blogs)
  })

//TO fetch json data of one entry
blogRouter.get('/:id', async(req,res)=>{
  const iD= req.params.id;

    const blog= await Blog.findById(iD)
    if(blog){
      res.json(blog)
    }
    else{
      res.status(404).end()
    }
  
  
})

//Post a blog
  blogRouter.post("/", async (req, response,next) => {
    const body = req.body;
    // const decoded= jwt.verify(request.token,process.env.secret_jwt);
    // if(!decoded.id){
    //   return response.status(401).json({error:'token invalid'})

    // }

    // const user = await User.findById(decoded.id);
    
    const blog = new Blog({
      user:req.user.id,
      ...body
    });
    const savedNote = await blog.save();
    req.user.blogs= req.user.blogs.concat(blog.id)
    await req.user.save()
    response.status(201).json(savedNote);
  });

  blogRouter.delete('/:id',async(req,res)=>{
    const iD= req.params.id;
    const decode = jwt.verify(req.token,process.env.secret_jwt)
    if(!(decode.id)) {
      res.status(402).json({error:'invalid token'})
      
    }
    const blog= await Blog.findById(iD)
    console.log(decode.id,blog.user)
    if(decode.id === blog.user.toString() ){
      await Blog.findByIdAndDelete(iD);
      res.status(204).end()
    }else{
      res.status(400).json({error:'you messed up bro'})
    }
    
    
    
  })
  blogRouter.put('/:id',async(req,res)=>{
    const iD = req.params.id;
    const editedBlog= await Blog.findByIdAndUpdate(iD,req.body);
    res.json(editedBlog);

  })

  module.exports = blogRouter;