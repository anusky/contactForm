import React from 'react'
import { render } from 'react-dom'
import { Router, Link } from '@reach/router'
import Form from './form'
//https://1vw2r75024.codesandbox.io/
import './lib/css/styles.css'
class App extends React.Component {
  render() {
    const style = {
      display: 'flex'
    }
    return (
      <div className="App">
        <header>
          <nav>
            <Link to="/">Home</Link> {' -'}
            <Link to="form">Form</Link>
            {' - '}
            <Link to="users/abc">Sally</Link>
          </nav>
        </header>
        {/*<h1>Hello CodeSandbox</h1> */}

        <div style={style} />
        <Router>
          <Form path="/form" />
        </Router>
      </div>
    )
  }
}
render(<App />, document.getElementById('root'))
