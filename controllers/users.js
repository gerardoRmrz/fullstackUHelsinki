const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const checkStringLength = (string, N) => {
  return string.length >= N
}

const checkUsernameLength = (username) => {
  return checkStringLength(username, 3)
}

const checkUserNameUnique = (username) => {
  const isUnique = User.find( {username} )
  return isUnique? false: true
}

const checkPasswordLength = (passw) => {
  return checkStringLength(passw, 3)
}

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if ( !checkUsernameLength(username) || !checkPasswordLength(password)) {
    return response.status(400).json( {error: 'The user name and password should be at least 3 chars long'} )
  }

  if ( !checkUserNameUnique(username) ) {
    return response.status(400).json({error: 'The user name should be unique'})
  }


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)

})

usersRouter.get('/', async (request, response) => {
  const userList = await User.find({})
  
  response.json( userList )
})

module.exports = usersRouter