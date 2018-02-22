import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'



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

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

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

  render() {

    const loginForm = () => (
      <div>
        <h2>Login</h2>

        <form onSubmit={this.login}>
          <div>
            Username: 
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            Password: 
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )

    const createBlogForm = () => (
      <div>
        <h2>Create New Blog</h2>

        <form onSubmit={this.createBlog}>
          <div>
            Title: 
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            Author: 
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            URL:  
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>

      )

    const loggedUserText = () => `User ${this.state.user.name} is logged in `
    const logoutButton = () => <button onClick={this.handleLogoutButton}>logout</button>
    const blogList = () => {
      const rows = this.state.blogs.map(blog => <Blog key={blog._id} blog={blog}/>)
      return (
        <div>
          <table>
          <tbody>
            {rows}
          </tbody>
          </table>
        </div>
      )
    }

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
