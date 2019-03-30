import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SecondaryButton } from '../../components/Button'
import Spinner from '../../components/Spinner/Spinner'
import { Link, Route } from 'react-router-dom'
import Integration from '../Integration/Integration'
import IntegrationList from './IntegrationList'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import config from '../../config'
import { FormGroup } from '../../components/Form'

const Detail = ({ match, app, payables, loadApp, loadPayables }) => {
  useEffect(() => {
    if (!match.params.id) return

    // Get the app info
    loadApp()
    loadPayables()
  }, [])

  const Loading = () => (
    <div>
      <Spinner />
    </div>
  )

  const [theme, setTheme] = useState('solid')
  const [price, setPrice] = useState(50)

  const actionUrl = () => `${config.wallet.baseUrl}/to/${app.id}?price=${price}`
  const imgUrl = () =>
    `${config.api.baseUrl}/embed?theme=${theme}&price=${price}`

  const getCodeStringHTML = () =>
    `<a href="${actionUrl()}" target="_blank">
  <img src="${imgUrl()}" alt="Say Thanks" width="250" />
</a>`

  const getCodeStringMD = () => `[![SayThanks](${imgUrl()})](${actionUrl()})`

  const AppContent = () => (
    <div className="max-w-md mx-auto">
      <section className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-3xl mb-2 text-grey-800">{app.name}</h1>
          <p className="text-lg leading-normal text-grey-800">
            {app.description}{' '}
            <a href={app.url} className="ml-2 font-normal text-cyan-700">
              <i className="fas fa-link text-xs mr-1 opacity-50" />
              {app.url}
            </a>
          </p>
        </div>
        {/* <div>
          <Link
            to={`${match.url}/payables/new`}
            className="bg-white px-4 py-2 btn-floating rounded-full active:text-pink-500 no-underline 
                             flex items-center uppercase text-sm font-semibold text-pink-500"
          >
            <i className="fas fa-code text-pink-200 text-sm mr-2" />{' '}
            <span className="mb-1">Get Integration Code</span>
          </Link>
        </div> */}
      </section>

      <section className="mb-6">
        <h2 className="inline-block mr-6 mb-4 uppercase tracking-wide font-semibold text-base text-grey-600">
          Create an Integration
        </h2>

        <div className="">
          <FormGroup className="inline-block mr-6" title="Theme">
            <select
              name="theme"
              value={theme}
              onChange={e => setTheme(e.target.value)}
            >
              <option value="minimal" selected>
                Minimal
              </option>
              <option value="solid">Solid</option>
              <option value="hollow">Hollow</option>
            </select>
          </FormGroup>

          <FormGroup className="inline-block mr-6" title="Suggested Price">
            <select
              name="price"
              value={price}
              onChange={e => setPrice(e.target.value)}
            >
              <option value="10">$0.10</option>
              <option value="25">$0.25</option>
              <option value="50">$0.50</option>
              <option value="75">$0.75</option>
              <option value="75">$0.75</option>
              <option value="100">$1</option>
            </select>
          </FormGroup>
        </div>

        <div>
          <Tabs>
            <TabList className=" list-reset mb-2">
              <div>
                <Tab
                  className="inline-block bg-none cursor-pointer px-4 font-medium text-sm pb-2 text-grey-600 uppercase tracking-wide focus:outline-none"
                  selectedClassName="border-b-2 border-pink-300 text-pink-500"
                >
                  HTML
                </Tab>
                <Tab
                  className="inline-block bg-none cursor-pointer px-4 font-medium text-sm pb-2 text-grey-600 uppercase tracking-wide focus:outline-none"
                  selectedClassName="border-b-2 border-pink-300 text-pink-500"
                >
                  Markdown
                </Tab>
              </div>
            </TabList>

            <TabPanel>
              <SyntaxHighlighter
                lang="html"
                className="rounded shadow-md"
                style={monokaiSublime}
                codeTagProps={{ style: { fontSize: '12px' } }}
              >
                {getCodeStringHTML()}
              </SyntaxHighlighter>
            </TabPanel>
            <TabPanel>
              <SyntaxHighlighter
                lang="markdown"
                className="rounded shadow-md"
                style={monokaiSublime}
                codeTagProps={{ style: { fontSize: '12px' } }}
              >
                {getCodeStringMD()}
              </SyntaxHighlighter>
            </TabPanel>
          </Tabs>

          <h3>Preview</h3>
          <div dangerouslySetInnerHTML={{ __html: getCodeStringHTML() }} />
        </div>
      </section>

      {/* <section>
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
      </section> */}
    </div>
  )

  return (
    <div className="">
      <Route
        path={`${match.path}/payables`}
        render={({ match }) =>
          !app || app.id !== match.params.id ? (
            <Loading />
          ) : (
            <Integration app={app} match={match} />
          )
        }
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

const mapState = ({ apps, payables }, { match }) => ({
  app: apps[match.params.id],
  payables: Object.keys(payables).reduce((accum, id) => {
    if (payables[id].app_id === match.params.id)
      return { ...accum, [id]: payables[id] }
    return accum
  }, {}),
})

const mapDispatch = ({ apps, payables }, { match }) => ({
  loadApp: () => apps.get(match.params.id),
  loadPayables: () => payables.list(match.params.id),
})
export default connect(
  mapState,
  mapDispatch
)(Detail)
