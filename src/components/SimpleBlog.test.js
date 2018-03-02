import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  	it('renders content', () => {
	    const blog = {
			title: "simple blog",
			author: "simplewoman",
			likes: 1
	    }
	    const blogComponent = shallow(<SimpleBlog blog={blog} />)

	    const blogDiv = blogComponent.find('.blog')
	    const likeDiv = blogComponent.find('.likes')

	    expect(blogDiv.text()).toContain(blog.title)
	    expect(blogDiv.text()).toContain(blog.author)
	    expect(likeDiv.text()).toContain(`${blog.likes} likes`)
	    
  	})

  	it('button handles clicks', () => {
	    const blog = {
			title: "simple blog",
			author: "simplewoman",
			likes: 1
	    }
	    const mockHandler = jest.fn()

	    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
		const button = blogComponent.find('button')

	  	button.simulate('click')
	  	button.simulate('click')

		expect(mockHandler.mock.calls.length).toBe(2)
  	})
})