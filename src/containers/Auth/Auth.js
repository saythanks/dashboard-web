import React from 'react'
import { Route } from 'react-router'
import Login from './Login'
import Verify from './Verify'
import { Switch } from 'react-router-dom'

const Auth = ({ match }) => {
  return (
    <div className="h-full">
      <Switch>
        <Route path={`${match.path}/verify`} component={Verify} />
        <Route path={`${match.path}`} exact component={Login} />
      </Switch>
    </div>
  )
}

export default Auth
