import React from 'react'
import { render } from 'react-dom'
import { Router, Link } from '@reach/router'
import Form from './form'

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
            <Link to="/">Home</Link> {' - '}
            <Link to="form">Form</Link>
          </nav>
        </header>

        <div style={style} />
        <Router>
          <Form path="/form" />
        </Router>
      </div>
    )
  }
}
render(<App />, document.getElementById('root'))
