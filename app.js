const config = require('./utils/config')
const express = require('express')
const middleware = require('./utils/middleware')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/appRouter')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)

console.log('Connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then( () => {
    console.log('connected to MONGO DB')
  } )

  app.use(cors())
  app.use(express.json())
  app.use('/api/users', usersRouter)
  app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogsRouter)
  app.use('/api/login', loginRouter)

  module.exports = app

