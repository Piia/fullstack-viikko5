import React from 'react'
import { shallow, mount } from 'enzyme'

import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'

jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('user not logged in', () => {

  	beforeEach(() => {
    	app = mount(<App />)
  	}) 

  	it('doesnt render blogs', () => {
	  	app.update()
	    const blogComponents = app.find(Blog)
	    expect(blogComponents.length).toEqual(0)
	 })

  	it('renders login-form', () => {
  		app.update()
    	expect(app.contains(LoginForm)).toBe(true) 
  	})

  })


  describe('user logged in', () => {

  	beforeAll(() => {
    	app = mount(<App />)
    	const user = {
			username: 'tester',
			token: '12312312145',
			name: 'Teuvo Testaaja'
		}
		localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
  	})

  	it('renders all blogs it gets from backend', () => {
	    app.update() 
	    const blogComponents = app.find(Blog)
	    expect(blogComponents.length).toEqual(blogService.blogs.length)
  	})
  })
})