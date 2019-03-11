import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Detail = ({ payable, app, load, match, loading }) => {
  useEffect(() => {
    load(match.params.payableId)
  }, [])

  const currentURL = () =>
    `${window.location.protocol}//${window.location.hostname}${window.location
      .port && `:${window.location.port}`}`

  const getCodeStringHTML = () =>
    `<a href="${currentURL()}/to/${payable.id}">
  <img src="${currentURL()}/saythanks_embed.svg" alt="Say Thanks" width="250" />
</a>`

  const getCodeStringMD = () =>
    `[![SayThanks](${currentURL()}/saythanks_embed.svg)](${currentURL()}/to/${
      payable.id
    })`

  if (loading) return <div>Loading...</div>
  if (!payable || !app) return <div>Not found...</div>
  return (
    <div>
      <p className="text-sm mb-1 uppercase tracking-wide text-grey-700">
        {app.name}
      </p>
      <h1>
        {payable.display_name} <span>({payable.display_price}¢)</span>
      </h1>

      <section className="mt-12">
        <h2>Integration Code</h2>

        <h3 className="mt-4 mb-2">HTML</h3>
        <SyntaxHighlighter
          className="rounded shadow-lg mt-4"
          language="html"
          style={github}
          codeTagProps={{ style: { fontSize: '12px' } }}
        >
          {getCodeStringHTML()}
        </SyntaxHighlighter>

        <h3 className="mt-4 mb-2">Markdown</h3>
        <SyntaxHighlighter
          className="rounded shadow-lg mt-4"
          language="markdown"
          style={github}
          codeTagProps={{ style: { fontSize: '12px' } }}
        >
          {getCodeStringMD()}
        </SyntaxHighlighter>
      </section>

      <section className="mt-12">
        <h2>Transactions</h2>
        <p>No transactions yet</p>
      </section>
    </div>
  )
}

const mapState = (state, props) => ({
  payable: state.payables[props.match.params.payableId],
  loading: state.loading.models.payables || state.loading.effects.apps.get,
})

const mapDispatch = (dispatch, { payable }) => ({
  load: dispatch.payables.get,
})

export default connect(
  mapState,
  mapDispatch
)(Detail)
