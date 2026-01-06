const getTokenFrom = (request, response, next) => {
  
  const authorization = request.get('authorization')
  
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
    next()
  }else{
    return response.status(401).send('Unauthorized. Please log in')
  }
  
  
}

module.exports = getTokenFrom