import React from 'react';


class App extends React.Component {

  handleVoteButton = (event) => {
    const anecdoteId = event.target.id
    this.props.store.dispatch({
      type: 'VOTE',
      data: {
              id: anecdoteId
            }
    })
  }

  handleCreateButton = (event) => {
    event.preventDefault()
    this.props.store.dispatch({
      type: 'CREATE',
      data: {
              content: event.target.anecdote.value
            }
    })
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button id={anecdote.id} onClick={this.handleVoteButton}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.handleCreateButton}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App