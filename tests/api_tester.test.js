const { test, after,beforeEach} = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const helper= require('./api_helper')

const Blog = require('../models/note')
beforeEach(async()=>{
    await Blog.deleteMany({})
    console.log('cleared')

    const fBlogs=helper.initialBlogs.map(blog=>new Blog(blog))
    const promiseArray= fBlogs.map(f => f.save());
    await Promise.all(promiseArray)
    
    console.log('done');
    
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there is only one note', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
 
  
test('the first blog is from Ketan', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(e => e.title)
    console.log(contents)
    assert(contents.includes('Ketan Super'))
  })

test('async/await simplifies the callback hell',async()=>{
    const newBlog={
        title: 'async simplify',
        author: 'Ketan',
        url:'ydk@gmail.com',
        likes:420
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

    const notesAtEnd=await helper.notesInDb();
    assert.strictEqual(notesAtEnd.length,helper.initialBlogs.length+1)
    
    const title=notesAtEnd.map(e=>e.title)
    assert(title.includes('async simplify'))
})
test('test without content will not work',async()=>{
    const newBlog={
        
        author:'spme',
        url: "some",
        likes:444
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(500)
    
    const notesAtEnd= await helper.notesInDb();
    assert.strictEqual(notesAtEnd.length,helper.initialBlogs.length)
})
test('delete functionality', async()=>{
  const blogsAtStart = await helper.notesInDb()
  const iD = blogsAtStart[0];
  await api
  .delete(`/api/blogs/${iD.id}`)
  .expect(204)

  const blogsAtEnd= await helper.notesInDb();
  const title = blogsAtEnd.map(e=>e.title);
  assert.strictEqual(blogsAtEnd.length,helper.initialBlogs.length-1)

  
  assert(!title.includes(iD.title))
})

test('update functionality', async()=>{
  const blogsAtStart = await helper.notesInDb()
  const iD = blogsAtStart[0];
  const newBlog={
    title: 'async simplify',
    author: 'Ketan',
    url:'',    
    likes:420
  }
  await api
  .put(`/api/blogs/${iD.id}`)
  .send(newBlog)
  .expect(200)
  const blogsAtEnd= await helper.notesInDb();

  assert.deepStrictEqual(newBlog,blogsAtEnd[0])
  })

after(async () => {
  await mongoose.connection.close()
})