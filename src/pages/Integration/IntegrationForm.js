import React, { useState } from 'react'
import * as yup from 'yup'

import { useForm } from '../../hooks/useForm'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Input } from '../../components/Form'
import { SecondaryButton } from '../../components/Button'

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
      name: yup.string().required('Name is required'),
      price: yup.string().required('Description is required'),
      url: yup
        .string()
        .url('Must be a valid url (with http:// or https://)')
        .required('URL is required'),
    },
  })

  if (success) return <Redirect to={`/sites/${app.id}`} />

  return (
    <form
      onSubmit={submit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-xl mb-3">
        New Integration <span className="font-normal">({app.name})</span>
      </h2>
      <p className="leading-normal text-grey-600 text-sm mb-4">
        Each integration is a piece of content that can be speficially unlocked
        or tipped.
      </p>
      <Input title="Name" model={fields.name} />
      <Input title="Price" model={fields.price} />
      <Input title="Permalink" model={fields.url} />

      <SecondaryButton loading={isSubmitting}>
        Create Integration
      </SecondaryButton>
    </form>
  )
}

const mapDispatch = dispatch => ({
  create: dispatch.payables.create,
})
export default connect(
  () => ({}),
  mapDispatch
)(IntegrationForm)
