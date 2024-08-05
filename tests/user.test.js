const bcrypt = require('bcryptjs')
const User = require('../models/user')
const mongoose=require('mongoose')
const {describe, test,beforeEach, after} = require('node:test')

const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const helper= require('./api_helper')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/user')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    console.log(usernames.includes(newUser.username))
    assert(usernames.includes(newUser.username))
  })
 
})
after(async () => {
    await mongoose.connection.close()
  })