import React from 'react'
import Nav from '../../components/Nav/Nav'
import Apps from '../Apps/Apps'
import { Route } from 'react-router-dom'
import Integration from '../Integration/Integration'

const Home = ({ match }) => {
  return (
    <div>
      <Nav />
      <div className="container mt-12 mx-auto">
        <Route path={`${match.path}`} exact component={Apps} />
        <Route path={`${match.path}integrations`} component={Integration} />
      </div>
    </div>
  )
}

export default Home
