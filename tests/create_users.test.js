const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const initialUsers = require('./usersList')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')

const api = supertest(app)

const saltRounds = 10

beforeEach( async () => {
   await User.deleteMany({})
   for ( const user of initialUsers ) {
     
    let passwordHash = await bcrypt.hash(user.password, saltRounds)
    
    let userObject = new User( {
       _id: user._id,
       name:user.name,
       username: user.username,
       passwordHash: passwordHash,
       blogs: user.blogs } )
       
    await userObject.save()
   }
})

describe('Creating a new user', ()=>{
  test('when creating a new user and username or password is missing, then return code 400 and an error message', async ()=>{
    const nameMissing = { 
      username: 'username',
      password: '545poiiu',
      blogs: []
     }  

     await api.post('/api/users')
      .send(nameMissing)
      .expect(400)
    
    const userNameMissing = { 
      name: 'newName',
      password: '545poiiu',
      blogs: []
     }

     await api.post('/api/users')
      .send(userNameMissing)
      .expect(400)

    const passwordMissing = { 
      name: 'newName',
      username: '',
      blogs: []
     }
    
     await api.post('/api/users')
      .send(passwordMissing)
      .expect(400)
  })

  test('when creating a new user and username exist in database, then return code 400 and an error message', async ()=>{

    const existingUser = {
        username:"akirKu",
        name: "Akira Kurosawa",
        blogs: []
            }
    
    await api.post('/api/users')
         .send(existingUser)
         .expect(400)

  })

  test('when create a new user and user data is correct, then add the new user to database and return code 200 and new user data', async ()=>{
    

    const newValidUser = {
      name: 'Kim Gordon',
      username: 'kimGo',
      password: 'mcjd@kidhj',
      blogs: []
    }

    await api.post('/api/users')
             .send(newValidUser)
             .expect('Content-Type', /json/)
             .expect(200)

    const newUserList = await api.get('/api/users')
    
    assert.strictEqual(newUserList._body.length, initialUsers.length+1)

  })

})


after(async () => {
  await mongoose.connection.close()
})    