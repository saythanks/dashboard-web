import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Input } from '../../components/Form'

const Login = ({ requestLink }) => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    requestLink(email)
  }

  return (
    <div className="container mx-auto h-full flex items-center justify-center">
      <div className="flex-1 max-w-sm mx-auto bg-white m-6 rounded-sm overflow-hidden shadow-lg">
        <div className="w-full h-1 bg-pink-400" />

        <div className="p-6">
          <h1 className="text-grey-800 uppercase tracking-wide text-base pb-3 mb-5 border-b border-grey-100">
            Sign in
          </h1>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="clearfix">
              <Input title="Email" value={email} onChange={setEmail} />

              <button className="bg-pink-400 px-4 py-2 text-white rounded-sm float-right shadow-lg block font-bold">
                Sign in
              </button>
            </form>
          ) : (
            <div>
              <p className="text-grey-500 mb-2">
                A sign-in link has been sent to your email.
              </p>
              <p>
                <a
                  href="#tryAgain"
                  className="text-pink-400 no-underline pb-1 text-sm"
                  onClick={e => {
                    e.preventDefault()
                    setSubmitted(false)
                  }}
                >
                  Didn't recieve an email? Try again
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const mapDispatch = ({ auth }) => ({
  requestLink: auth.requestEmailLink,
})

export default connect(
  () => ({}),
  mapDispatch
)(Login)
