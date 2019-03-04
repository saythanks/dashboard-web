import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const types = {
  red: '#FF5A52',
  yellow: '#E6C029',
  green: '#52C22C',
  grey: '#E4E7EB',
}

const WindowButton = ({ type }) => (
  <div
    className={`inline-block mx-1 rounded-full`}
    style={{ backgroundColor: types[type], width: '10px', height: '10px' }}
  />
)

const Chrome = ({ placeholder = false } = {}) => (
  <div
    className={
      'flex items-center h-5 border-b border-grey-100 px-2 ' +
      (!placeholder && 'bg-white')
    }
  >
    <WindowButton type={placeholder ? 'grey' : 'red'} />
    <WindowButton type={placeholder ? 'grey' : 'yellow'} />
    <WindowButton type={placeholder ? 'grey' : 'green'} />
  </div>
)

const Placeholder = () => {
  const [hovering, setHovering] = useState(false)

  return (
    <a
      className={appStyle(true) + ' block relative'}
      href="#app"
      onClick={e => {
        e.preventDefault()
        alert('new app')
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Chrome placeholder />
      <div className="text-grey-300">
        {hovering && (
          <div className="absolute w-full h-full bg-grey-050 z-10 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg text-pink-400 font-bold mb-4">New App</p>
              <i className="fas fa-plus mb-4 text-pink-200" />
            </div>
          </div>
        )}
        <div className="p-3">
          {/* <div className="w-12 h-12 mb-4 rounded-full border border-grey-100" /> */}
          <h2 className="mt-3">My New Website</h2>

          <div className="pr-4 mt-5">
            <div className="p-0 mb-1">
              <div className="row bg-grey-100 w-full  h-2" />
            </div>
            <div className="pr-3 mb-1">
              <div className="row bg-grey-100 w-full  h-2" />
            </div>
            <div className="pr-2 mb-1">
              <div className="row bg-grey-100 w-full  h-2" />
            </div>
            <div className="p-0 mb-1">
              <div className="row bg-grey-100 w-full  h-2" />
            </div>
            <div className="mb-1">
              <div className="row bg-grey-100 w-16  h-2" />
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

const appStyle = placeholder =>
  'rounded no-underline text-black w-64 m-12 flex-grow border border-grey-100 overflow-hidden ' +
  (!placeholder && 'bg-white shadow-md border-none')

const App = ({ app }) => {
  const [hovering, setHovering] = useState(false)

  return (
    <Link
      className={appStyle(false)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      to={`/integrations/${app.id}`}
    >
      <Chrome placeholder={hovering} />
      <div className="p-3  flex flex-col justify-between">
        {/* <div className="w-12 h-12 mb-4 rounded-full border border-grey-100" /> */}
        <section>
          <h2 className="mt-3 mb-4">{app.name}</h2>
          <p className="leading-normal mb-4 text-grey-400 text-lg">
            {app.description}
          </p>
        </section>
      </div>
    </Link>
  )
}

const Home = ({ apps, loadApps }) => {
  useEffect(() => {
    loadApps()
  }, [])

  return (
    <div>
      <Nav />
      <div className="container mt-12 mx-auto">
        <h1 className="mb-10">My Integrations</h1>
        <div className="-m-12 flex justify-between flex-wrap">
          {apps.length === 0 && (
            <>
              <Placeholder />
              <Placeholder />
            </>
          )}
          {apps.map(app => (
            <App app={app} key={app.id} />
          ))}
          <Placeholder />
        </div>
      </div>
    </div>
  )
}

const mapState = ({ apps }) => ({ apps: apps.data })
const mapDispatch = ({ apps }) => ({ loadApps: apps.loadApps })
export default connect(
  mapState,
  mapDispatch
)(Home)
