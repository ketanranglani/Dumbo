const blogRouter = require('express').Router();
const Blog = require('../models/note');
const User = require('../models/user')
blogRouter.get('/', async (request, response) => {
  const blogs= await Blog.find({})
  response.json(blogs)
  })

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

  blogRouter.post("/", async (request, response) => {
    const body = request.body;
    const user = await User.find(body.userId);
    const blog = new Blog({
      user:user.id,
      ...body
    });
    const savedNote = await blog.save();
    response.status(201).json(savedNote);
  });

  blogRouter.delete('/:id',async(req,res)=>{
    const iD= req.params.id;
    console.log(iD)
    
    await Blog.findByIdAndDelete(iD);
    res.status(204).end()
    
  })
  blogRouter.put('/:id',async(req,res)=>{
    const iD = req.params.id;
    const editedBlog= await Blog.findByIdAndUpdate(iD,req.body);
    res.json(editedBlog);

  })

  module.exports = blogRouter;