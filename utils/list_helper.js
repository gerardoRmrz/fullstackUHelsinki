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

const mostBlogs = (blogs) => {
  if (blogs.length===0){
    return null
  }

  const authors = [...new Set( blogs.map( blog => blog.author ) )  ]

  const blogsCount = authors.map(  author => { return {author, blogs: blogs.filter( blog => blog.author===author ).length}})
  
  const maxBlogs = blogsCount.reduce( (acc, curr) => curr.blogs > acc.blogs ? curr : acc, { blogs: -1 }   )

  return maxBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}