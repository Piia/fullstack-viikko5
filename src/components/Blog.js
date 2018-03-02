import React from 'react'
const Blog = ({blog, user, likeHandler, deleteHandler}) => {

    const likeButton = () => {
    	return (
    			<p>
    				{blog.likes} likes 
    				<button id={blog._id} onClick={likeHandler}>LIKE</button>
    			</p>
    	)
    }

    const deleteButton = () => {
    	return (
    		(!blog.user || blog.author === user) &&
    			<p>
    				<button id={blog._id} onClick={deleteHandler}>DELETE</button>
    			</p>
    	)
    }

	return (
		<div>
			<p><a href={blog.url}>{blog.url}</a></p>
	  		{likeButton()}
	  		<p>Added by {blog.author}</p>
	  		{deleteButton()}
		</div>
	)
}

export default Blog