const { test, describe } = require('node:test')
const assert = require('node:assert')
const blogsList = require( './blogsList' )
const listHelper = require('../utils/list_helper')

describe('most Blogs: ', () => {
  test( 'when blog list is empty, equals to null', () => {
    blogs = []
    const result = listHelper.mostBlogs(blogs)
    assert.strictEqual(result, null)
  } )

  test('when blogs list has only one element, equals to the object with the name of the author an blogs=1', () => {
    blogs = [blogsList[1]]
    const result = listHelper.mostBlogs(blogs)
    assert.deepEqual( result, {author: blogs[0].author, blogs:1} )
  })


  test('when blogs list has many elements, equals to the object with the name of the author with more blogs and the number of the blogs published', () => {
    
    const result = listHelper.mostBlogs(blogsList)
    assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 })

  })

})