import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import { Link, Route } from 'react-router-dom'
import Integration from '../Integration/Integration'
import SyntaxHighlighter from 'react-syntax-highlighter'
import 'react-tabs/style/react-tabs.css'
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import config from '../../config'
import { Select, Input, FormGroup } from '../../components/Form'
import useClipboard from '../../hooks/useClipboard'
import { toast } from 'react-toastify'
import { useForm } from '../../hooks/useForm'
import * as yup from 'yup'
import Card from '../../components/Card'
import PageTitleCard from '../../components/PageTitleCard'
import api from '../../lib/api/index'
import { formatCents } from '../../util/currency'
import moment from 'moment'
import Avatar from 'react-avatar'
import ThemePicker from '../../components/ThemePicker/ThemePicker'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { lighten } from '../../util/color'
import { publicUrlTo } from '../../util/url'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const NewIntegrationCard = ({ app }) => {
  const colors = [
    ['#E8368F', 'white'],
    ['#E12D39', 'white'],
    ['#f6993f', 'white'],
    ['#38c172', 'white'],
    ['#3490dc', 'white'],
    ['white', '#E8368F'],
    ['white', 'black'],
  ]
  const {
    fields,
    onChange,
    values: { price, theme, color, name, url },
  } = useForm({
    validateOnChange: true,
    initialValues: {
      theme: 'solid',
      color: colors[0],
      price: 50,
      name: '',
      url: '',
    },
    onSubmit: () => ({}),
    schema: {
      theme: yup.mixed().oneOf(['solid', 'hollow', 'minimal']),
      price: yup.string(),
      name: yup.string(),
      url: yup.string().url(),
    },
  })

  const [showDetail, setShowDetail] = useState(true)

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

  const htmlCode = () =>
    `
<style>
.st-button {
  background: ${color[0]}; 
  color: ${color[1]}; 
  border-radius: 9999px;
  padding: 5px 15px;
  font-weight: bold;
  font-family: brandon-grotesque, sans-serif;
  box-shadow: 0 2px 4px rgba(0,0,0.04,.15);
  text-decoration: none;
  transition: all .15s;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.st-button:hover {
  background-color: ${lighten(color[0], 10)}
}

.st-button>img {
  display: inline-block;
  margin-right: 10px;

}
</style>
<a href="${actionUrl()}" target="_blank" class="st-button"><img src="${publicUrlTo(
      color[0] === 'white' ? 'LogoB.svg' : 'logo_light.svg'
    )}" width="20" />Say thanks for ${formatCents(price)}</a>
`

  const getCodeStringMD = () => `[![SayThanks](${imgUrl()})](${actionUrl()})`

  const { copy } = useClipboard()

  return (
    <Card className="text-center">
      <h2 className="inline-block mr-6 mb-4 uppercase tracking-wide font-semibold text-base text-grey-600">
        Create a Button
      </h2>

      <p className="font-normal leading-normal mb-6 text-grey-500 px-12">
        Add a button to your page to allow anyone to tip your content. Just pick
        your color and suggested price.
      </p>

      <ThemePicker
        colors={colors}
        value={color}
        onChange={onChange('color')}
        className="block mt-4"
      />

      <div className="sm:-mx-2 sm:flex items-start">
        {/* <Select
          title="Theme"
          className="sm:w-1/2 w-full m-0 inline-block px-0 sm:px-2"
          model={fields.theme}
          options={{
            minimal: 'Minimal',
            solid: 'Solid',
            hollow: 'Hollow',
          }}
        /> */}

        <div className="px-12 max-w-sm block w-full mx-auto my-12">
          <label className="mb-6 text-grey-400 font-medium text-sm uppercase tracking-wide">
            Suggested Price
          </label>
          <Slider
            min={10}
            className="block mt-4"
            marks={{
              10: '10¢',
              25: '25¢',
              50: '50¢',
              75: '75¢',
              100: '$1.00',
            }}
            value={price}
            onChange={onChange('price')}
            step={null}
          />
        </div>
      </div>

      {false && showDetail && (
        <div className="sm:-mx-2 sm:flex items-start">
          <Input
            title="Content Title"
            className="sm:w-1/2 w-full m-0 inline-block px-0 sm:px-2"
            model={fields.name}
            placeholder="Optional"
          />
          <Input
            title="Content URL"
            className="sm:w-1/2 w-full m-0 inline-block px-0 sm:px-2"
            type="url"
            model={fields.url}
            placeholder="Optional"
          />
        </div>
      )}

      <div className="w-full">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 sm:pr-2">
            <button
              className="border border-grey-100 w-full p-2 mb-2 rounded-full
                    text-grey-500 font-bold uppercase tracking-wide text-sm btn-floating focus:outline-none"
              onClick={() =>
                copy(htmlCode(), () => toast.success('Copied Code'))
              }
            >
              {/* <i className="fas fa-clipboard text-grey-200 mr-2" /> */}
              <div>
                <p>Copy HTML Code</p>
                <p className="normal-case text-sm font-normal text-grey-300">
                  For websites, blogs, Wordpress, etc.
                </p>
              </div>
            </button>
          </div>
          <div className="w-full sm:w-1/2 sm:pl-2">
            <button
              className="border border-grey-100 w-full p-2 mb-2 rounded-full
                    text-grey-500 font-bold uppercase tracking-wide text-sm btn-floating"
              onClick={() =>
                copy(htmlCode(), () => toast.success('Copied Code'))
              }
            >
              {/* <i className="fas fa-clipboard text-grey-200 mr-2" /> */}
              <div>
                <p>Copy Image Code</p>
                <p className="normal-case text-sm font-normal text-grey-300">
                  For Github, Tumblr, etc.
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-grey-050 -mx-4 -mb-6 px-4 py-6 mt-4 text-center">
        <p className="uppercase tracking-wide text-grey-500 font-semibold mb-4">
          Live Button Preview
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: htmlCode(),
          }}
        />
      </div>
    </Card>
  )
}

const AppTitleCard = ({ match, app, className }) => (
  <PageTitleCard title={app.name} className={className}>
    <p className="text-lg leading-normal text-grey-600">
      <div className="-mt-12">
        <Avatar
          name={app.name}
          src={app.image_url}
          size={60}
          round
          className="shadow"
        />
      </div>
      <h1 className="text-3xl mb-2 text-grey-800">{app.name}</h1>
      {app.description}{' '}
      <a href={app.url} className="ml-2 font-normal text-cyan-700">
        <i className="fas fa-link text-xs mr-1 opacity-50" />
        {app.url}
      </a>
    </p>
    <p className="mt-4 text-xl text-grey-800">
      <span className="font-bold">{formatCents(app.balance)}</span> in balance
    </p>
    <div className="mt-4 sm:-mx-2 sm:flex items-center">
      <Link
        to={`${match.url}/settings`}
        className="btn-floating bg-white px-4 py-2 border border-grey-100 rounded-full active:bg-grey-100 hover:bg-grey-050 no-underline 
                    sm:mx-2 mb-2 sm:mb-0 inline-flex items-baseline uppercase text-sm font-semibold text-grey-500
                    w-full sm:w-auto block sm:inline-block"
      >
        <i className="fas fa-cog text-grey-200 text-sm mr-2" />
        <span className="">Site Settings</span>
      </Link>
      {/* <Link
        to={`${match.url}/cashout`}
        className="btn-floating bg-white px-4 py-2 border border-grey-100 rounded-full active:bg-grey-100 hover:bg-grey-050 no-underline 
                   sm:mx-2 inline-flex items-baseline uppercase text-sm font-semibold text-grey-500
                   w-full sm:w-auto block sm:inline-block"
      >
        <i className="fas fa-dollar-sign text-grey-200 text-sm mr-2" />
        <span className="">Cash out</span>
      </Link> */}
    </div>
  </PageTitleCard>
)

const TxChartCard = ({ appId, className }) => {
  const [tx, setTx] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    api
      .get('/transactions/to', { params: { app: appId, page } })
      .then(tx => setTx(tx))
      .finally(() => setLoading(false))
  }, [page, appId])

  let data = !tx
    ? []
    : tx.items
        .map(t => ({
          name: moment(t.time_created).format('M/DD'),
          amount: t.amount,
        }))
        .reverse()

  console.log(data)

  let dummyData = [
    { name: '4-01', amount: 3.7 },
    { name: '4-02', amount: 14.9 },
    { name: '4-03', amount: 1.4 },
  ]

  return (
    <Card className={className}>
      <h2 className="block mr-6 mb-4 uppercase tracking-wide font-semibold text-base text-grey-600">
        Recent Transactions
      </h2>

      {loading ? (
        <Spinner />
      ) : dummyData.length === 0 ? (
        'Nothing Yet'
      ) : (
        <div>

          <BarChart
            width={500}
            height={250}
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <Bar dataKey="amount" fill="#DA127D" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={t => formatCents(parseInt(t))} />
            {/* <Tooltip formatter={t => formatCents(100 * parseInt(t))} /> */}
            <Tooltip
              cursor={{ fill: 'red', fillOpacity: 0.05 }}
              formatter={(v, n, p) => formatCents(parseInt(v))}
            />
          </BarChart>
        </div>
      )}
    </Card>
  )
}

const TxRow = ({ tx }) => (
  <div className="flex justify-between py-2 hover:bg-grey-025 -mx-4 px-4">
    <div>
      <div className="inline-block text-grey-800 text-lg font-normal">
        {formatCents(tx.amount)}
      </div>
      <div className="ml-2 inline-block text-grey-300 font-medium">
        {moment(tx.time_created).fromNow()}
      </div>
    </div>
    <div>
      {tx.user.name && (
        <p className="text-grey-500">
          from <span className="text-grey-800 font-medium">{tx.user.name}</span>
        </p>
      )}
    </div>
  </div>
)

const TxListCard = ({ appId }) => {
  const [tx, setTx] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    api
      .get('/transactions/to', { params: { app: appId, page } })
      .then(tx => setTx(tx))
      .finally(() => setLoading(false))
  }, [page, appId])

  console.log(tx)

  return (
    <Card>
      <h2 className="block mr-6 mb-4 uppercase tracking-wide font-semibold text-base text-grey-600">
        Transactions
      </h2>

      {loading ? (
        <Spinner />
      ) : !tx || tx.items.length === 0 ? (
        'Nothing Yet'
      ) : (
        <div>
          <div className="mb-4">
            {tx.has_prev && (
              <button
                className="bg-grey-050 rounded shadow border border-grey-100 px-2 py-1 mr-2"
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
            )}
            {tx.has_next && (
              <button
                className="bg-grey-050 rounded shadow border border-grey-100 px-2 py-1"
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            )}
          </div>
          {tx.items.map(t => (
            <TxRow tx={t} key={t.id} />
          ))}
        </div>
      )}
    </Card>
  )
}

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

  if (!app) return <Loading />

  return (
    <div className="mb-16">
      <Route
        path={`${match.path}/payables`}
        render={({ match }) => <Integration app={app} match={match} />}
      />
      <Route
        path={`${match.path}`}
        exact
        render={() => (
          <div className="md:flex -mx-4">
            <div className="md:w-1/2 m-0 px-4">
              <AppTitleCard match={match} app={app} className="mb-12" />
              <NewIntegrationCard app={app} />
            </div>
            <div className="md:w-1/2 m-0 px-4 pt-12 sm:pt-0">
              <TxChartCard appId={match.params.id} className="mb-12" />
              <TxListCard appId={match.params.id} />
            </div>
          </div>
        )}
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
