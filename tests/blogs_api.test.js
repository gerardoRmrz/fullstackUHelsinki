const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const initialBlogs = require('./blogsList')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

     beforeEach( async () => {
        await Blog.deleteMany({})
        for ( const blog of initialBlogs ) {
          let blogObject = new Blog( blog )
          await blogObject.save()
        }
    }) 

/* test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)  
}) */

test.only('blogs have id property, not _id', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)

  for ( const blog of response.body ) {
    if (!Object.prototype.hasOwnProperty.call(blog, 'id')){
      throw new Error('Response body does not contain the property id')
    }
  }
    
})


after(async () => {
  await mongoose.connection.close()
})

