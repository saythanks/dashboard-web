import React from 'react'
import Nav from '../../components/Nav/Nav'
import Sites from '../Sites/Sites'
import { Route } from 'react-router-dom'
import Site from '../Site/Site'
import Footer from '../../components/Nav/Footer'

const Home = ({ match }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <Nav />
        <div className="container mt-12 mx-auto px-6 sm:px-0">
          <Route path={`${match.path}`} exact component={Sites} />
          <Route path={`${match.path}sites`} component={Site} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
