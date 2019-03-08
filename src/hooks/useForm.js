import { useState } from 'react'
import * as yup from 'yup'

/**
 * Inspired by https://github.com/BenMagyar/form-hooks
 */

export const useForm = ({
  initialValues,
  onSubmit,
  schema,
  validateOnBlur = true,
  validateOnChange = false,
} = {}) => {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitCount, setSubmitCount] = useState(0)

  const validator = yup.object(schema)

  const done = () => setIsSubmitting(false)

  const validate = async () => {
    try {
      await validator.validate(values, { abortEarly: false })
      return true
    } catch (e) {
      let errors = e.inner

      let update = {}
      for (let error of e.inner) {
        const name = error.path ? error.path : error.params.path
        update = { ...update, [name]: error.message }
      }
      setErrors({ ...errors, ...update })

      return false
    }
  }

  const validateField = async name => {
    try {
      await schema[name].validate(values[name])
      resetError(name)
      return true
    } catch (e) {
      updateError(e, name)
      return false
    }
  }

  const resetError = name => {
    delete errors[name]
    setErrors(errors)
  }

  const updateError = (err, name) => {
    if (!name) name = err.path ? err.path : err.params.path
    setErrors({
      ...errors,
      [name]: err.message,
    })
  }

  const onBlur = name => () => {
    setTouched({ ...touched, [name]: true })

    if (validateOnBlur) validateField(name)
  }

  const onChange = name => value => {
    setValues({ ...values, [name]: value })

    if (!!errors[name] || validateOnChange) validateField(name)
  }

  const submit = async event => {
    event.preventDefault()

    setIsSubmitting(true)
    setSubmitCount(submitCount + 1)

    const fields = [...Object.keys(values), ...Object.keys(initialValues)]
    setTouched(Object.assign({}, ...fields.map(k => ({ [k]: true }))))

    const valid = await validate()

    if (!valid) {
      setIsSubmitting(false)
      return
    }

    return Promise.resolve(onSubmit(values)).then(() => setIsSubmitting(false))
  }

  const fields = {}
  Object.keys(values).forEach(name => {
    fields[name] = {
      value: values[name],
      onChange: onChange(name),
      onBlur: onBlur(name),
      error: errors[name],
    }
  })

  return {
    fields,
    values,
    onBlur,
    onChange,
    submit,
    errors,
    isSubmitting,
    done,
  }
}
