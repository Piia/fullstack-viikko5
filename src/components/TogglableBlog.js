import PropTypes from 'prop-types'
import React from 'react'

class TogglableBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
    }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div style={this.blogStyle}>
        <p onClick={this.toggleVisibility} className="title">{this.props.title}</p>
        <div style={showWhenVisible} className="togglableContent">
          {this.props.children}
        </div>
      </div>
    )
  }
}

TogglableBlog.propTypes = {
    title: PropTypes.string.isRequired
  }

export default TogglableBlog