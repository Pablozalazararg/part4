const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, post) => sum + post.likes, 0);
};

const favoriteBlogs = (blogs) =>{
  let mostLike = 0 
  blogs.forEach((blog)=> { return (blog.likes>=mostLike ) ? mostLike=blog.likes : mostLike })
  let blogsMostLike = blogs.filter(blog=>blog.likes==mostLike)
  
  return({title: blogsMostLike[0].title})  
};

const mostBlogs = (blogs) =>{
  const authorBlogs = blogs.map(blog=>blog.author)
  const mostBlog =authorBlogs.filter((item, index)=>{
    return authorBlogs.indexOf(item) === index;
  })
  most= authorBlogs.map(blog=>mostBlog.blog+1)
  blogsMostLike = blogs.filter(blog=>blog.likes==Math.max(...blogsMostLike))
  
  return({title: blogsMostLike[0].title, author: blogsMostLike[0].blogs})  
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs
}