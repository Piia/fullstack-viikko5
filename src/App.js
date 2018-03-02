import React from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: "",
      password: "",
      user: null,
      author: '',
      title: '',
      url: '',
      notificationClass: '',
      notificationContent: ''
    }
  }

  async componentDidMount() {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes)
    this.setState({ blogs: sortedBlogs })
    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user})
      this.setNotification({ className: 'message', content: 'Logged in successfully' })
    } catch (exception) {
      this.setNotification({ className: 'error', content: 'Incorrect username or password' })
    }
  }

  createBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
      const blogs = this.state.blogs.concat(blog)
      this.setState({title: '', author: '', url: '', blogs})
      this.setNotification({ className: 'message', content: `New blog ${blog.title} created successfully` })
    } catch (exception){
      this.setNotification({ className: 'error', content: 'Creation failed' })
    }
  }

  setNotification = ({className, content}) => {
    this.setState({ notificationClass: className, notificationContent: content })
      setTimeout(() => {
        this.setState({ notificationClass: '', notificationContent: '' })
      }, 5000)
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogoutButton = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ user: null })
  }

  handleLikeButton = async (event) => {
    event.preventDefault()
    try {
      const blogId = event.target.id;
      const updatedBlog = await blogService.like({id: blogId})
      const updatedBlogs = this.state.blogs.map(blog => {
        return blog._id === blogId ? updatedBlog : blog
      })
      this.setState({blogs: updatedBlogs})
      this.setNotification({ className: 'message', content: `Blog ${updatedBlog.title} liked (${updatedBlog.likes} likes)` })
    } catch (exception){
      this.setNotification({ className: 'error', content: 'Like failed' })
    }
  }

  handleDeleteButton = async (event) => {
    event.preventDefault()
    console.log(event.target.id)
    const blogId = event.target.id
    const targetBlog = this.state.blogs.find(blog => blog._id === blogId)
    if(window.confirm(`Delete ${targetBlog.title} by ${targetBlog.author}?`) === false) {
      return
    }
    try {    
      await blogService.destroy({id: blogId})
      const updatedBlogs = this.state.blogs.filter(blog => blog._id !== blogId)
      this.setState({blogs: updatedBlogs})
      this.setNotification({ className: 'message', content: `Blog ${targetBlog.title} were destroyed` })
    } catch (exception){
      this.setNotification({ className: 'error', content: 'Deletion failed' })
    }
  }

  render() {

    const loginForm = () => <Togglable buttonLabel="Login">
                              <LoginForm 
                                handleSubmit={this.login}
                                handleChange={this.handleFieldChange}
                                username={this.state.username}
                                password={this.state.password} />
                            </Togglable>

    const createBlogForm = () =>  <Togglable buttonLabel="Create new blog">
                                    <CreateBlogForm 
                                      handleSubmit={this.createBlog}
                                      handleChange={this.handleFieldChange}
                                      title={this.state.title}
                                      author={this.state.author}
                                      url={this.state.url} />
                                  </Togglable>

    const loggedUserText = () => `User ${this.state.user.name} is logged in `
    const logoutButton = () => <button onClick={this.handleLogoutButton}>logout</button>
    
    const blogList = () => <BlogList  blogs={this.state.blogs} 
                                      user={this.state.user.name} 
                                      likeHandler={this.handleLikeButton}
                                      deleteHandler={this.handleDeleteButton} />

    const blogsHeader = () => <h1>Blogs</h1>

    return (
      <div>

        {this.state.user !== null && blogsHeader()}

        <Notification 
          className={this.state.notificationClass} 
          content={this.state.notificationContent} />

        {this.state.user === null && loginForm()}
        {this.state.user !== null && loggedUserText()}
        {this.state.user !== null && logoutButton()}

        {this.state.user !== null && createBlogForm()}
        {this.state.user !== null && blogList()}
      </div>
    );
  }
}

export default App;
