import React, { useState } from 'react'
import { Input, TextArea, FormGroup } from '../../components/Form'
import { SecondaryButton, PrimaryButton } from '../../components/Button'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import * as yup from 'yup'
import { Avatar } from 'react-avatar'

const IntegrationForm = ({ create, update, app, edit, destroy, appId }) => {
  const [success, setSuccess] = useState(false)

  const [widget] = useState(
    //eslint-disable-next-line
    cloudinary.createUploadWidget(
      {
        cloudName: 'saythanks',
        uploadPreset: 'app_img',
        cropping: true,
        croppingAspectRatio: 1,
      },
      (error, result) => {
        if (error) return console.error(error)
        if (result.event !== 'success') return
        console.log(result)
        onChange('image')(result.info.secure_url)
      }
    )
  )

  const handleSubmit = values => {
    create(values)
      .then(id => {
        setSuccess(true)
      })
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
      image: app ? app.image_url : '',
      url: app ? app.url : '',
    },
    onSubmit: handleSubmit,
    schema: {
      name: yup.string().required('Name is required'),
      description: yup.string().required('Description is required'),
      image: yup.string().url(),
      url: yup
        .string()
        .url('Must be a valid url (with http:// or https://)')
        .required('URL is required'),
    },
  })

  if (success) return <Redirect to="/" />

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

      <div className="flex items-center">
        <FormGroup className="inline-block text-center mr-6">
          <button
            type="button"
            className="font-bold underline text-grey-500 text-sm focus:outline-none hover:text-grey-700"
            onClick={() => widget.open()}
          >
            {values.image ? (
              <img
                src={values.image}
                className="w-16 hover:bg-grey-050 h-16 border border-grey-200 rounded-full block mb-2"
                alt=""
              />
            ) : (
              <div className="block">
                <Avatar name={values.name} round size={65} />
              </div>
            )}
            Set Image
          </button>
          {errors.image && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </FormGroup>

        <Input
          title="Name"
          className="inline-block flex-1"
          placeholder="e.g. 'Ben Jones' or 'My Blog Name'"
          value={values.name}
          error={errors.name}
          onBlur={onBlur('name')}
          onChange={onChange('name')}
        />
      </div>
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

      <PrimaryButton
        type="submit"
        loading={isSubmitting}
        className="block w-full"
      >
        {edit ? 'Update' : 'Create'} Site
      </PrimaryButton>

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
