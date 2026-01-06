const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  
  const blogs = await Blog.find({})
                          .populate('userId', { username:1, name:1 })

  console.log('appRouter: ', blogs)

  response.status(200).json(blogs)
})


blogsRouter.post('/', async (request, response) => { 
  
  if ( !request.body.title || !request.body.url ) {
   return response.status(400).end()
  }

  const user = request.user

  if (!user) {
    return response.status(400).json({error: "userId does not founded in database"})
  }

  request.body.likes = request.body.likes?  request.body.likes: 0
  

  const blog = new Blog({
                  title: request.body.title,
                  url: request.body.url,
                  author: request.body.author,
                  likes: request.body.likes,
                  userId: user.id,
  })
  
  
  const result = await blog.save()
  response.status(201).json(result)

})

blogsRouter.delete('/:id', async (request, response) => {
  
    const user = request.user

    if (!user) {
      return response.status(400).json({error: "userId was not founded in database"})
    }

    const id = request.params.id 
    
    const blogToBeDeleted = await Blog.findById(id)

    if( !blogToBeDeleted ){
      return response.status(400).json({ message: 'Blog id was not founded in database' })
    }

    if ( blogToBeDeleted.userId.toString() === user.id.toString() ){
      const blog = await Blog.findByIdAndDelete(id)
      return response.status(204).end()
    }else{
      return response.status(401).json({error: 'Unathorized. Please log in'})
    }

})


blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  const blogToBeUpdated = await Blog.findById(id)

  if (!blogToBeUpdated) {
    return response.status(400).json({message: 'Id not founded in database'})
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
        id
      , { ...blogToBeUpdated._doc, likes: blogToBeUpdated.likes+1   }
      , {new: true}
    )

    if(!updatedBlog) {
      return response.status(400).json({error: 'The update was fail'})
    }

    return response.status(200).json(updatedBlog)
})

module.exports = blogsRouter