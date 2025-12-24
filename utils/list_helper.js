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

const favoriteBlog = (blogs) => {
  if (blogs.length===0){
    return {}
  }

  return blogs.reduce( (acc, curr) =>  curr.likes > acc.likes? curr: acc , { likes: -1 } )
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}