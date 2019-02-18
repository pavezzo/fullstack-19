const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.delete('/:id', async(request, response) => {
    await Blog.findOneAndDelete({_id: request.params.id})
    response.sendStatus(204)
})

blogsRouter.put('/:id', async(request, response) => {
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }

    const newBlog = await Blog.findOneAndUpdate({_id: request.params.id}, blog, {new: true})
    response.status(202).json(newBlog.toJSON())
})

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
})
  
blogsRouter.post('/', async(request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }

    if (request.body.likes === undefined) {
        request.body.likes = 0
    }

    if (request.body.title === undefined || request.body.url === undefined) {
        return response.sendStatus(400)
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user._id
    })
  
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result.toJSON())    
})



module.exports = blogsRouter;