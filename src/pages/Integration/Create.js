import React from 'react'
import IntegrationForm from './IntegrationForm'

const Create = ({ app }) => {
  return (
    <div className="container mx-auto">
      <IntegrationForm app={app} />
    </div>
  )
}

export default Create
