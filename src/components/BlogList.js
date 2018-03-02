import React from 'react'
import Blog from './Blog'
import TogglableBlog from './TogglableBlog'

const BlogList = ({blogs, user, likeHandler, deleteHandler}) => {

    const blogComponents = blogs.map(blog => {
    	return (
    		<tr key={blog._id}>
    			<td>
		    		<TogglableBlog title={blog.title}>
		    			<Blog 	key={blog._id} 
		    					blog={blog} 
		    					user={user}
		    					likeHandler={likeHandler}
		    					deleteHandler={deleteHandler} />
		    		</TogglableBlog>
    			</td>
    		</tr>
    	)
    })

	return (
		<div>
			<table>
			<tbody>
		  		{blogComponents} 
		  	</tbody>
		  	</table> 
		</div>
	)
}

export default BlogList