import React, { useEffect } from 'react'
import { compose } from 'redux'
import { Provider, connect } from 'react-redux'
import { getPersistor } from '@rematch/persist'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { BrowserRouter as Router, withRouter, Switch } from 'react-router-dom'
import './App.css'
import store from '../../store/index'
import Home from '../Home/Home'
import PrivateRoute from '../../containers/PrivateRoute'
import PublicRoute from '../../containers/PublicRoute'
import Auth from '../../containers/Auth/Auth'
import api from '../../lib/api/index'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = ({ listen, user }) => {
  useEffect(() => {
    listen()
  }, [])

  useEffect(() => {
    if (user) api.setTokenGetter(() => user.idToken)
    else api.setTokenGetter(() => null)
  }, [user])

  return (
    <div className="h-full">
      <ToastContainer />
      <Switch>
        <PublicRoute path="/login" component={Auth} />
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </div>
  )
}

const mapDispatch = dispatch => ({
  listen: dispatch.auth.listen,
})
const ConnectedApp = compose(
  withRouter,
  connect(
    ({ auth }) => ({ unsub: auth.unsub, user: auth.user }),
    mapDispatch
  )
)(App)

const persistor = getPersistor()
const WrappedApp = () => (
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <Router>
        <ConnectedApp />
      </Router>
    </Provider>
  </PersistGate>
)

export default WrappedApp
