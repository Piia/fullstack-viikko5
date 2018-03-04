import React from 'react'

const Statistiikka = ({store}) => {
  const hyvia = store.getState().good
  const huonoja = store.getState().bad
  const neutraaleja = store.getState().ok
  const palautteita = huonoja + neutraaleja + hyvia
  const positiivisia = (hyvia / palautteita).toFixed(2) + '%'

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{hyvia}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{neutraaleja}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{huonoja}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia}</td>
          </tr>
        </tbody>
      </table>

      <button>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {  
  klik = (nappi) => () => {
    this.props.store.dispatch({type: nappi})
  }



  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka store={this.props.store} />
      </div>
    )
  }

}


export default App