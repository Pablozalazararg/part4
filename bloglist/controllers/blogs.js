const blogRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')
const { error } = require('../utils/logger')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 , id:1})

  response.json(blogs)
})
blogRouter.post('/', middleware.userExtractor ,async (request, response) => {
  const body = new Blog(request.body)
  if(request.user=null) {
    user = await User.find({}).limit(1)
    user=user[0]
  }
  const blog =  new Blog (
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user
    }
  ) 
  if( !blog.title && !blog.url) {
    response.status(400)
  }
  await blog.save()
  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  const createdBlog = await Blog.findById(blog._id).populate('user',{username:1,name:1,id:1})
  response.json(createdBlog)

})

blogRouter.put('/:id', middleware.userExtractor,async(request,response) => {
  const body = request.body
  const blog =  new Blog (
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,      
    }    
  ) 
  const opts = {
    runValidators:true,
    new:true,
    context:'query'
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, opts)
  response.json(updatedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor,async (request, response) => {
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