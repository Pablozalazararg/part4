const blogRouter = require('express').Router()

const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const body = new Blog(request.body)
  const blog = new Blog (
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }
  )

  blog
  .save()
  .then(savedBlog => {
    response.json(savedBlog)
  })
  .catch(error => next(error))
})
module.exports = blogRouter