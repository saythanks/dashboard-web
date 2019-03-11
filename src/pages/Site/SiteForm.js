import React, { useState } from 'react'
import { Input, TextArea } from '../../components/Form'
import { SecondaryButton, PrimaryButton } from '../../components/Button'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import * as yup from 'yup'

const IntegrationForm = ({ create, update, app, edit, destroy, appId }) => {
  const [success, setSuccess] = useState(false)

  const handleSubmit = values => {
    if (!edit)
      create(values)
        .then(() => setSuccess(true))
        .catch(console.error)
        .finally(done)
    else
      update(values)
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
      name: app ? app.name : '',
      description: app ? app.description : '',
      url: app ? app.url : '',
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

  if (success && app) return <Redirect to={`/sites/${app.id}`} />

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={submit}
    >
      {edit ? (
        <h2 className="text-xl mb-3">Edit Site</h2>
      ) : (
        <>
          <h2 className="text-xl mb-3">New Site</h2>
          <p className="leading-normal text-grey-600 text-sm mb-4">
            Each site is like a bucket to hold related pieces of content and
            recieve payment. When a user pays for or gives to your content, they
            will see this information as who their money is going to.
          </p>
        </>
      )}

      <Input
        title="Name"
        placeholder="e.g. 'Ben Jones' or 'My Blog Name'"
        value={values.name}
        error={errors.name}
        onBlur={onBlur('name')}
        onChange={onChange('name')}
      />
      <TextArea
        title="Description"
        placeholder="A couple sentences about who or what you are"
        value={values.description}
        error={errors.description}
        onBlur={onBlur('description')}
        onChange={onChange('description')}
      />
      <Input
        title="Public URL"
        type="url"
        placeholder="Where can users go to see you or your content"
        value={values.url}
        error={errors.url}
        onBlur={onBlur('url')}
        onChange={onChange('url')}
      />

      <SecondaryButton type="submit" loading={isSubmitting}>
        {edit ? 'Update' : 'Create'} Site
      </SecondaryButton>

      {edit && (
        <div className="mt-12">
          <PrimaryButton
            className="block"
            onClick={() => destroy(app ? app.id : '')}
          >
            Delete Site
          </PrimaryButton>
        </div>
      )}
    </form>
  )
}

const mapState = (state, { appId }) => ({
  app: state.apps[appId],
})

const mapDispatch = (dispatch, { match }) => ({
  create: dispatch.apps.create,
  destroy: dispatch.apps.delete,
})

export default connect(
  mapState,
  mapDispatch
)(IntegrationForm)
