import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { SecondaryButton } from '../../components/Button'
import Spinner from '../../components/Spinner/Spinner'
import { Link, Route } from 'react-router-dom'
import Integration from '../Integration/Integration'
import IntegrationList from './IntegrationList'

const Detail = ({ match, app, payables, load }) => {
  useEffect(() => {
    if (!match.params.id) return

    // Get the app info
    load()
  }, [])

  const Loading = () => (
    <div>
      <Spinner />
    </div>
  )

  const AppContent = () => (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl mb-2 text-grey-800">{app.name}</h1>
        <p className="text-lg leading-normal text-grey-800">
          {app.description}{' '}
          <a href={app.url} className="ml-1 font-normal text-cyan-700">
            {app.url}
          </a>
        </p>
      </section>

      <section>
        <div>
          <h2 className="inline-block mr-6 mb-6 uppercase tracking-wide font-semibold text-base text-grey-600">
            Integrations
          </h2>
          <Link to={`${match.url}/payables/new`}>
            <SecondaryButton size="sm" onClick={() => null}>
              <i className="fas fa-plus" /> Add Integration
            </SecondaryButton>
          </Link>
        </div>
        {payables && <IntegrationList app={app} payables={payables} />}
      </section>
    </div>
  )

  return (
    <div className="max-w-md mx-auto">
      <Route
        path={`${match.path}/payables`}
        render={({ match }) => <Integration app={app} match={match} />}
      />
      <Route
        path={`${match.path}`}
        exact
        render={() =>
          !app || app.id !== match.params.id ? <Loading /> : <AppContent />
        }
      />
    </div>
  )
}

const mapState = ({ apps }, { match }) => ({
  app: apps.currentApp,
  payables: apps.payables,
})

const mapDispatch = ({ apps }, { match }) => ({
  load: () => apps.getApp(match.params.id),
})
export default connect(
  mapState,
  mapDispatch
)(Detail)
