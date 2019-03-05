import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { SecondaryButton } from '../../components/Button'
import Spinner from '../../components/Spinner/Spinner'

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
          <h2 className="inline-block mr-6 uppercase tracking-wide font-semibold text-base text-grey-600">
            Integrations
          </h2>
          <SecondaryButton size="sm">
            <i className="fas fa-plus" /> Add Integration
          </SecondaryButton>
        </div>
        <pre>{JSON.stringify(payables, null, 2)}</pre>
      </section>
    </div>
  )

  return (
    <div className="max-w-md mx-auto">
      {!app || app.id !== match.params.id ? <Loading /> : <AppContent />}
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
