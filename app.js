const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/appRouter')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

console.log('Connecting to', config.MONGO_URI)

mongoose.connect(config.MONGO_URI)
  .then( () => {
    console.log('connected to MONGO DB')
  } )

  app.use(cors())
  app.use(express.json())
  app.use('/api/blogs', blogsRouter)

  module.exports = app

