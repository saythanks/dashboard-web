import React from 'react'
import Nav from '../../components/Nav/Nav'
import { connect } from 'react-redux'

const Home = ({ apps }) => {
  return (
    <div>
      <Nav />
      <div className="container mt-12 mx-auto">
        <h1 className="mb-4">My Apps</h1>
        <div>{apps.length === 0 && <div>You ain't got no apps.</div>}</div>
      </div>
    </div>
  )
}

const mapState = ({ apps }) => ({ apps })
export default connect(mapState)(Home)
