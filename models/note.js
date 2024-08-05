const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const User = require('../models/user')
require('dotenv').config()

const mongoUrl = process.env.NODE_ENV ==='test'
? process.env.MONGODB_URL
: process.env.TEST_URL
mongoose.connect(mongoUrl).then(()=>{
    console.log('connected to MongoDB')
}
).catch((error)=>{
    console.log('error connecting to MongoDB:', error.message)
})
const blogSchema = new mongoose.Schema({
    title: {
      type:String,
      
    },
    author: String,
    url: String,
    likes: Number,
    user:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    }]
  }
  
  )
  blogSchema.set('toJSON',{
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // returnedObject.author=returnedObject.author.toString()

    }
  })
  const Blog = mongoose.model('Blog', blogSchema)

  module.exports = Blog