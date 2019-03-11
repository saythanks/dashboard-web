import React from 'react'
import SiteForm from './SiteForm'

const Edit = ({ match }) => {
  return (
    <div className="mx-auto container">
      <div className="w-full mx-auto max-w-sm">
        <SiteForm edit appId={match.params.id} />
      </div>
    </div>
  )
}

export default Edit
