const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 , id:1})

  response.json(blogs)
})

blogRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user:body.user
  }
  const opts = {
    runValidators: true,
    new: true,
    context: 'query',
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, opts)
  response.json(updatedBlog)
})

blogRouter.post('/', middleware.userExtractor, async (request, response)  => {
  
  let user = request.user
  if (request.user == null) {
    user = await User.find({}).limit(1)
    user = user[0]
  }
  const body = request.body
  const blog =  new Blog (
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    }
  ) 
  if( !blog.title && !blog.url) {
    response.status(400)
  }
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)

})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(400).json({
      error:'blog not exists'
    })
  }
  if(!request.token || (user.id.toString() !== blog.user.toString())) {
    return response.status(400).json({
      error:'you are not the author'
    })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter