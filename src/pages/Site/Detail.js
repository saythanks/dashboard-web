import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SecondaryButton, PrimaryButton } from '../../components/Button'
import Spinner from '../../components/Spinner/Spinner'
import { Link, Route } from 'react-router-dom'
import Integration from '../Integration/Integration'
import SyntaxHighlighter from 'react-syntax-highlighter'
import 'react-tabs/style/react-tabs.css'
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import config from '../../config'
import { Select, Input } from '../../components/Form'
import useClipboard from '../../hooks/useClipboard'
import { toast } from 'react-toastify'
import { useForm } from '../../hooks/useForm'
import * as yup from 'yup'

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

  const {
    fields,
    values: { price, theme, name, url },
  } = useForm({
    validateOnChange: true,
    initialValues: {
      theme: 'solid',
      price: 50,
      name: '',
      url: '',
    },
    onSubmit: () => ({}),
    schema: {
      theme: yup.mixed().oneOf(['solid', 'hollow', 'minimal']),
      price: yup.mixed().oneOf(['10', '25', '50', '75', '100']),
      name: yup.string().required(),
      url: yup
        .string()
        .url()
        .required(),
    },
  })

  const [showDetail, setShowDetail] = useState(false)

  const actionUrl = () => {
    let action = `${config.wallet.baseUrl}/to/${app.id}\n\t?price=${price}`
    if (!!name) action += `\n\t&name=${name}`
    if (!!url) action += `\n\t&url=${url}`
    return action
  }

  const imgUrl = () =>
    `${config.api.baseUrl}/embed?theme=${theme}&price=${price}`

  const getCodeStringHTML = () =>
    `<a href="${actionUrl()}" target="_blank">
  <img src="${imgUrl()}" alt="Say Thanks" width="250" height="40" />
</a>`

  const getCodeStringMD = () => `[![SayThanks](${imgUrl()})](${actionUrl()})`

  const { copy } = useClipboard()

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
          !app || app.id !== match.params.id ? (
            <Loading />
          ) : (
            <div className="-mt-32">
              <section
                className="mb-12 flex justify-between items-center 
                         md:w-1/2 2-full bg-white shadow-lg rounded p-6"
              >
                <div>
                  <h1 className="text-2xl mb-2 text-grey-800">{app.name}</h1>

                  <p className="text-lg leading-normal text-grey-600 ">
                    {app.description}{' '}
                    <a
                      href={app.url}
                      className="ml-2 font-normal text-cyan-700"
                    >
                      <i className="fas fa-link text-xs mr-1 opacity-50" />
                      {app.url}
                    </a>
                  </p>
                  <div className="mt-4 -mx-2 flex items-center">
                    <Link
                      to={`${match.url}/settings`}
                      className="btn-floating bg-white px-4 py-2 border border-grey-100 rounded-full active:bg-grey-100 hover:bg-grey-050 no-underline 
                                    mx-2 inline-flex items-baseline uppercase text-sm font-semibold text-grey-500"
                    >
                      <i className="fas fa-cog text-grey-200 text-sm mr-2" />
                      <span className="">Site Settings</span>
                    </Link>
                    <Link
                      to={`${match.url}/cashout`}
                      className="btn-floating bg-white px-4 py-2 border border-grey-100 rounded-full active:bg-grey-100 hover:bg-grey-050 no-underline 
                                    mx-2 inline-flex items-baseline uppercase text-sm font-semibold text-grey-500"
                    >
                      <i className="fas fa-dollar-sign text-grey-200 text-sm mr-2" />
                      <span className="">Cash out</span>
                    </Link>
                  </div>
                </div>
              </section>

              <div className="w-full md:flex items-start">
                <section className="bg-white md:w-1/2 px-4 py-6 shadow-lg rounded">
                  <h2 className="inline-block mr-6 mb-4 uppercase tracking-wide font-semibold text-base text-grey-600">
                    Create an Integration
                  </h2>

                  <p className="font-normal leading-normal mb-6 text-grey-500">
                    Use a generic integration if you want users's to just tip
                    you or your app. A content specific integration will show
                    users the name you specify when they tip.
                  </p>

                  <div className="sm:-mx-2 sm:flex items-start">
                    <Select
                      title="Type"
                      className="sm:w-1/2 w-full m-0 inline-block px-0 sm:px-2"
                      value={showDetail ? 'spef' : 'gen'}
                      onChange={val => setShowDetail(val === 'spef')}
                      options={{
                        gen: 'Generic',
                        spef: 'Content Specific',
                      }}
                    />
                    <Select
                      title="Theme"
                      className="sm:w-1/2 w-full m-0 inline-block px-0 sm:px-2"
                      model={fields.theme}
                      options={{
                        minimal: 'Minimal',
                        solid: 'Solid',
                        hollow: 'Hollow',
                      }}
                    />

                    <Select
                      title="Suggested Price"
                      className="sm:w-1/2 w-full m-0 inline-block px-0 sm:px-2"
                      options={{
                        10: '$0.10',
                        25: '$0.25',
                        50: '$0.50',
                        75: '$0.75',
                        100: '$1.00',
                      }}
                      model={fields.price}
                    />
                  </div>

                  {showDetail && (
                    <div className="sm:-mx-2 sm:flex items-start">
                      <Input
                        title="Content Title"
                        className="sm:w-1/2 w-full m-0 inline-block px-0 sm:px-2"
                        model={fields.name}
                      />
                      <Input
                        title="Content URL"
                        className="sm:w-1/2 w-full m-0 inline-block px-0 sm:px-2"
                        type="url"
                        model={fields.url}
                      />
                    </div>
                  )}

                  <div className="w-full">
                    <button
                      className="text-teal-dark mb-2 font-bold uppercase tracking-wide text-sm"
                      onClick={() =>
                        copy(getCodeStringHTML(), () =>
                          toast.success('Copied Code')
                        )
                      }
                    >
                      <i className="fas fa-clipboard text-teal opacity-75 mr-2" />
                      Copy
                    </button>
                    <SyntaxHighlighter
                      language="html"
                      className="rounded shadow-md text-left"
                      style={monokaiSublime}
                      codeTagProps={{ style: { fontSize: '12px' } }}
                    >
                      {getCodeStringHTML()}
                    </SyntaxHighlighter>
                    {/* <Tabs>
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
                </Tabs> */}

                    <div className="bg-grey-050 -mx-4 -mb-6 px-4 py-6 mt-4 text-center">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getCodeStringHTML(),
                        }}
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )
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
