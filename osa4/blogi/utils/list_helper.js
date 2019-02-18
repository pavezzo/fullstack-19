const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0;

    blogs.map(b => likes += b.likes)

    return likes
}

const favoriteBlog = (blogs) => {
    let ind = blogs.map(b => b.likes).reduce((iMax, x, i, arr) => x > blogs[iMax].likes ? i : iMax, 0)
    return blogs[ind]
}

const mostBlogs = (blogs) => {
    return _(blogs)
        .groupBy('author')
        .map((item, author) => ({ author, blogs: item.length }))
        .maxBy('blogs')
}

const mostLikes = (blogs) => {
    const tulos = _(blogs)
        .groupBy('author')
        .map((blogs, author) => {
        const likes = blogs.reduce((sum, nextBlog) => sum + nextBlog.likes, 0)
        return ({ author, likes })
    })
    .maxBy('likes')

    return tulos
} 

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}