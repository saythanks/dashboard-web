import React from 'react'
import IntegrationForm from './IntegrationForm'

const Create = ({ app }) => {
  return (
    <div className="max-w-sm mx-auto">
      <IntegrationForm app={app} />
    </div>
  )
}

export default Create
