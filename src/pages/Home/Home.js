import React, { useEffect } from 'react'
import Nav from '../../components/Nav/Nav'
import { connect } from 'react-redux'

const Home = ({ apps, loadApps }) => {
  useEffect(() => {
    loadApps()
  }, [])

  return (
    <div>
      <Nav />
      <div className="container mt-12 mx-auto">
        <h1 className="mb-4">My Apps</h1>
        <div>
          {apps.length === 0 && <div>You ain't got no apps.</div>}
          {apps.length > 0 && <pre>{JSON.stringify(apps, null, 2)}</pre>}
        </div>
      </div>
    </div>
  )
}

const mapState = ({ apps }) => ({ apps })
const mapDispatch = ({ apps }) => ({ loadApps: apps.loadApps })
export default connect(
  mapState,
  mapDispatch
)(Home)
