import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatCents } from '../../util/currency'
import { ReactComponent as EmptyDrawing } from '../../media/coins.svg'

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
    <Link
      className={appStyle(true) + ' block relative bg-grey-050'}
      to="/sites/new"
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
    </Link>
  )
}

const appStyle = placeholder =>
  'rounded inline-block no-underline w-full h-full text-black w-1/3 border border-grey-100  ' +
  (!placeholder ? 'bg-white shadow-lg border-none btn-floating' : 'shadow')

const App = ({ app }) => {
  const [hovering, setHovering] = useState(false)

  return (
    <Link
      className={appStyle(false)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      to={`/sites/${app.id}`}
    >
      <Chrome placeholder={hovering} />
      <div className="p-3  flex flex-col justify-between">
        {/* <div className="w-12 h-12 mb-4 rounded-full border border-grey-100" /> */}
        {/* <div className="block -mt-4"> */}
        {/* <Avatar name={app.name} src={app.image_url} size={50} round /> */}
        {/* </div> */}
        <section>
          <h2 className="mt-3 mb-4">{app.name}</h2>
          <p className="leading-normal mb-4 text-grey-400 text-lg">
            {app.description}
          </p>

          <p className="leading-normal mb-4 text-pink-600 font-bold text-base">
            {formatCents(app.balance)} earned
          </p>
        </section>
      </div>
    </Link>
  )
}

const Wrap = ({ children }) => (
  <div className="w-full md:w-1/3 flex-0 inline-block p-6">{children}</div>
)

const Apps = ({ apps, loadApps }) => {
  const [loading, setLaoding] = useState(true)

  useEffect(() => {
    loadApps()
  }, [])

  useEffect(() => {
    if (apps) setLaoding(false)
  }, apps)

  if (loading) return <div>Loading</div>

  const sortedApps = [].concat(Object.keys(apps))
  sortedApps.sort(
    (a, b) => new Date(apps[a].time_created) - new Date(apps[b]).time_created
  )

  if (!apps || Object.keys(apps).length === 0)
    return (
      <div className="flex flex-col items-center justify-center">
        <EmptyDrawing height={200} />
        <h1 className="mt-12">Get Started with SayThanks</h1>
        <p className="text-xl mt-4">
          <Link className="text-teal-dark" to="/sites/new">
            Create your SayThanks page
          </Link>{' '}
          and start accepting tips everywhere
        </p>

        <Link
          to="/sites/new"
          className="btn-floating bg-pink-500 text-white px-4 py-2 no-underline font-bold rounded tracking-wide uppercase mt-10 text-xl"
        >
          Create a new Page
        </Link>
      </div>
    )
  return (
    <div className="flex flex-col mb-20 ">
      {/* <h1 className="mb-16 md:self-start">My Sites</h1> */}
      <div className="flex flex-wrap -m-6 ">
        {sortedApps.map(id => (
          <Wrap key={id}>
            <App app={apps[id]} />
          </Wrap>
        ))}
        <Wrap>
          <Placeholder />
        </Wrap>
        {/* <div className="filler flex-1" /> */}
      </div>
    </div>
  )
}

const mapState = ({ apps }) => ({ apps })
const mapDispatch = ({ apps }) => ({ loadApps: apps.list })

export default connect(
  mapState,
  mapDispatch
)(Apps)
