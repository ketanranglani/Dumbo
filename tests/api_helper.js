const Blog = require('../models/note')
const User = require('../models/user')
const initialBlogs=[
    { 
     title : "Ketan ranglani",
     author: "Something authory",
     url: " something@gmail.com",
     likes: 540
     },
     { 
        title : "Ketan Super",
        author: "Something not authory",
        url: " something@gmail.com",
        likes: 420
      }
 ]

const nonExistingId = async () => {
  const note = new Blog({ title: 'willremovethissoon',
    author:" ",
    email: " ",
    likes: 420
   })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}
const usersInDb=async()=>{
  const users= await User.find({})
  return users.map(some=>some.username)
}

module.exports = {
  initialBlogs, nonExistingId, notesInDb,usersInDb
}