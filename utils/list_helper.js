const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length===0){
    return 0
  }
  
  return blogs.reduce( (acc, curr) => { 
      return acc + curr.likes 
    }, 0 )
}

module.exports = {
  dummy,
  totalLikes
}