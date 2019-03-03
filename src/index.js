import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './pages/App/App'
import './config/firebase'
import * as serviceWorker from './serviceWorker'

const root = document.getElementById('root')
ReactDOM.render(<App />, root)

if (module.hot) {
  module.hot.accept('./pages/App/App', () => {
    const NextApp = require('./pages/App/App').default
    ReactDOM.render(<NextApp />, root)
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
