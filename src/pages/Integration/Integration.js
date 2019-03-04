import React from 'react'
import { Route } from 'react-router'
import Detail from './Detail'
import Create from './Create'

const Integration = ({ match }) => (
  <>
    <Route path={`${match.path}/:id`} exact component={Detail} />
    <Route path={`${match.path}/new`} exact component={Create} />
  </>
)

export default Integration
