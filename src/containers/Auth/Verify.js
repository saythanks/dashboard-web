import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'

const Verify = ({ authenticated, verifyEmail }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Call to firebase auth login
    console.log('testing')
    verifyEmail({ url: window.location.href })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (error)
    return (
      <div className="flex justify-center items-center p-6 h-full">
        <p className="mb-6 text-grey-500">
          Something went wrong, please{' '}
          <Link to="/login" className="text-pink-500">
            try again
          </Link>
        </p>
      </div>
    )

  return (
    <div className="flex justify-center items-center p-6 h-full">
      {!authenticated || loading ? (
        <div className="flex items-center flex-col">
          <p className="mb-6 text-grey-500">Signing in</p>
          <Spinner />
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  )
}

const mapState = state => ({
  authenticated: state.auth.authenticated,
})

const mapDispatch = dispatch => ({
  verifyEmail: dispatch.auth.verifyEmailLink,
})
export default connect(
  mapState,
  mapDispatch
)(Verify)
