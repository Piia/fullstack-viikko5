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

    const handler = () => {
    	return
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={handler} />)
    const contentDiv = blogComponent.find('.author')

    expect(contentDiv.text()).toContain(blog.author)
  })
})