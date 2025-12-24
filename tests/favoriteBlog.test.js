const blogsList = require( './blogsList' )
const listHelper = require('../utils/list_helper')
const { describe, test } = require('node:test')
const assert = require('node:assert')

describe( 'favorite blog: ',() => {
  
  test( 'when blog list is empty, equals to empty object', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, {}) 
  } )

  test('when blog list has only one blog, equals to that blog', () => {
    const justThisBlog =  blogsList[0] 
    const result = listHelper.favoriteBlog( [ justThisBlog ])
    assert.deepStrictEqual(result, justThisBlog) 
  })

  test('when blog list has many blogs, equals to the blog with the most likes', () => {
    const result = listHelper.favoriteBlog( blogsList )
    assert.deepStrictEqual( result, {
                                      _id: "5a422b3a1b54a676234d17f9",
                                      title: "Canonical string reduction",
                                      author: "Edsger W. Dijkstra",
                                      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                                      likes: 12,
                                      __v: 0
                                    } )
  })
  //listHelper.favoriteBlog(blogsList) 
  })