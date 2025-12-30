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
  const isUserinDb = User.find( {username} )
  return !isUserinDb
}

const checkPasswordLength = (passw) => {
  return checkStringLength(passw, 3)
}

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  
  if ( !username || !name || !password ) {
    console.log( 'checking username, name, password' )
    return response.status(400).json({error: 'The username, name or password is missing'})
  }

  if ( !checkUsernameLength(username) || !checkPasswordLength(password)) {
    console.log('checking username and password length')
    return response.status(400).json( {error: 'The user name and password should be at least 3 chars long'} )
  }

  if ( checkUserNameUnique(username) ) {
    console.log('checking username unicity')
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

  return response.status(200).json(savedUser)

})

usersRouter.get('/', async (request, response) => {
  const userList = await User.find({})
  response.json( userList )
})

module.exports = usersRouter