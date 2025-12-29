const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
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

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)  
})

test('blogs have id property, not _id', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)

  for ( const blog of response.body ) {
    assert(blog.hasOwnProperty('id'), 'The blogs should have the property "id"')
  }
})


test( 'blogs are correctly created with POST request', async () => {
  
  const newBlog = { title: "Learning Javascript",
                    author: "Lou Natic",
                    url: "http://theJavaScript.com",
                    likes: 1}


  const formerLength = initialBlogs.length

    await api.post('/api/blogs')
            .send(newBlog)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect( (response) => {
              const { id: _, ...newObj } = response.body
              assert.deepStrictEqual(newObj, newBlog)
            } )
    
    await api.get('/api/blogs')
             .expect(200)
             .expect( (response) => {
                assert.strictEqual(response.body.length, formerLength+1)               
             } )
                        
} )


test('blogs has the correct "like" property value if request miss it', async () => {
  
  const blogNoLikes = { title: "Learning Javascript",
                    author: "Lou Natic",
                    url: "http://theJavaScript.com"}

  await api.post('/api/blogs')
            .send(blogNoLikes)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect( (response) => {
              assert.strictEqual( response.body.likes, 0 )
            } )
})

test.only( 'Api response with code 400, bad request if title or url are missed', async () => {
  
  const blogNoTitle = { 
                    author: "Lou Natic",
                    url: "http://theJavaScript.com",
                    likes: 0}

  const blogNoUrl = { title: "Learning Javascript",
                    author: "Lou Natic",
                    likes: 1}

  await api.post('/api/blogs')
            .send(blogNoTitle)
            .expect(400)
  
  await api.post('/api/blogs')
            .send(blogNoUrl)
            .expect(400)            
} )
                    
after(async () => {
  await mongoose.connection.close()
})

