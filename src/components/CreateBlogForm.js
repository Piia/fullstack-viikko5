import React from 'react'

const CreateBlogForm = ({ handleSubmit, handleChange, title, author, url }) => {

  return (
        <div>
          <h2>Create New Blog</h2>

          <form onSubmit={handleSubmit}>
            <div>
              Title: 
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </div>
            <div>
              Author: 
              <input
                type="text"
                name="author"
                value={author}
                onChange={handleChange}
              />
            </div>
            <div>
              URL:  
              <input
                type="text"
                name="url"
                value={url}
                onChange={handleChange}
              />
            </div>
            <button type="submit">create</button>
          </form>
        </div>

  )
}

export default CreateBlogForm