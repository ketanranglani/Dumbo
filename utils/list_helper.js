var _ = require('lodash')
const dummy = (blogs) => {
    return blogs.length>1 ?  1 : 0
  }

const totalLikes = (blogs) => {
    return blogs.reduce((acc,curr)=>acc+curr.likes,0)
    
}
const favoriteBlog = (blogs) => {
    let max= blogs[0];
    for(let blog of blogs){
        blog.likes>max.likes ? max=blog : blog
        
    }
    
    return max
}
const mostBlogs=(blog)=>{    
  let resultName = _.last(_.keys(_.countBy(_.map(blog,'author'))))
  
  let result = _.pick(_.find(blog,{ 'author': resultName}),['author'])

  //const result = _.pick(max,['author','likes'])
  //console.log(result)
  return result
  
}
  
  module.exports = {
    dummy,totalLikes,favoriteBlog,mostBlogs
  }