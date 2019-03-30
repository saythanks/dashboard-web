import React, { useState } from 'react'
import * as yup from 'yup'

import { useForm } from '../../hooks/useForm'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Input, FormGroup, textInputStyle } from '../../components/Form'
import { SecondaryButton } from '../../components/Button'
import SyntaxHighlighter from 'react-syntax-highlighter'

const IntegrationForm = ({ create, app }) => {
  const [success, setSuccess] = useState(false)

  const handleSubmit = values => {
    create({ ...values, appId: app.id })
      .then(() => setSuccess(true))
      .catch(console.error)
      .finally(done)
  }

  const { fields, submit, isSubmitting, done } = useForm({
    initialValues: {
      name: '',
      price: '',
      url: '',
    },
    onSubmit: handleSubmit,
    schema: {
      name: yup.string(),
      price: yup.string(),
      url: yup.string().url('Must be a valid url (with http:// or https://)'),
    },
  })

  if (success) return <Redirect to={`/sites/${app.id}`} />

  return (
    <div className="flex justify-between">
      <form
        onSubmit={submit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-xl mb-3">
          New Integration <span className="font-normal">({app.name})</span>
        </h2>
        <p className="leading-normal text-grey-600 text-sm mb-4">
          Each integration is a special link to your donation page
        </p>
        <Input title="Display Name" model={fields.name} placholder="optional" />
        <FormGroup title="Suggested Price">
          <select
            name=""
            id="Suggested Price"
            className={'w-full bg-white appearance-none ' + textInputStyle()}
          >
            <option value="20">$0.25</option>
            <option value="20">$0.50</option>
            <option value="20">$0.75</option>
            <option value="20">$1.00</option>
          </select>
        </FormGroup>
        <Input title="Permalink" model={fields.url} />
      </form>
      <div className="preview">
        <h2>Preview</h2>
      </div>
    </div>
  )
}

const mapDispatch = dispatch => ({
  create: dispatch.payables.create,
})
export default connect(
  () => ({}),
  mapDispatch
)(IntegrationForm)
