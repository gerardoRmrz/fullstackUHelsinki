const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {

  if ( !request.body.title || !request.body.url ){
   return response.status(400).end()
  }

  request.body.likes = request.body.likes?  request.body.likes: 0
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  
  const blogToBeDeleted = await Blog.findByIdAndDelete(id)

  if( !blogToBeDeleted ){
    return response.status(400).json({ message: 'Id not founded in database' })
  }

  return response.status(204).json({message: 'Blog deleted successfully'})

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