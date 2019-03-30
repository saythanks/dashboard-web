import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Create from './Create'
import Detail from './Detail'

const Integration = ({ match, app }) => {
  return (
    <Switch>
      <Route path={`${match.path}/new`} render={() => <Create app={app} />} />
      <Route
        path={`${match.path}/:payableId`}
        render={({ match }) => <Detail app={app} match={match} />}
      />
    </Switch>
  )
}

export default Integration
