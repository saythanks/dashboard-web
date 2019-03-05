import React, { useState } from 'react'
import * as yup from 'yup'

import { useForm } from '../../hooks/useForm'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const IntegrationForm = ({ create }) => {
  const [success, setSuccess] = useState(false)

  const handleSubmit = values => {
    create(values)
      .then(() => setSuccess(true))
      .catch(console.error)
      .finally(done)
  }

  const {
    values,
    errors,
    submit,
    onBlur,
    onChange,
    isSubmitting,
    done,
  } = useForm({
    initialValues: {
      name: '',
      description: '',
      url: '',
    },
    onSubmit: handleSubmit,
    schema: {
      name: yup.string().required('Name is required'),
      description: yup.string().required('Description is required'),
      url: yup
        .string()
        .url('Must be a valid url (with http:// or https://)')
        .required('URL is required'),
    },
  })

  if (success) return <Redirect to={`/sites/`} />
}

const mapDispatch = dispatch => ({
  create: dispatch.apps.createPayable,
})
export default connect()(IntegrationForm)
