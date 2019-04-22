import React from 'react'
import { Route } from 'react-router'
import Detail from './Detail'
import Create from './Create'
import { Switch } from 'react-router-dom'
import Edit from './Edit'

const Site = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/new`} component={Create} />
    <Route path={`${match.path}/:id/settings`} component={Edit} />
    <Route path={`${match.path}/:id`} component={Detail} />
  </Switch>
)

export default Site
