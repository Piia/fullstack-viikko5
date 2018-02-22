import React from 'react'
const Blog = ({blog}) => (
  <tr>
    <td><b>{blog.title}</b></td><td>{blog.author}</td> 
  </tr>  
)

export default Blog