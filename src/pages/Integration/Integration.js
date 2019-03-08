import React from 'react'
import { Route } from 'react-router-dom'
import Create from './Create'
import Detail from './Detail'

const Integration = ({ match, app }) => {
  return (
    <>
      <Route path={`${match.path}/new`} render={() => <Create app={app} />} />
      <Route
        path={`${match.path}/:payableId`}
        render={({ match }) => <Detail app={app} match={match} />}
      />
    </>
  )
}

export default Integration
