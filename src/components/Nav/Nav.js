import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Nav = ({ logout, user }) => {
  return (
    <nav className="bg-white border-grey-100 shadow-md">
      <div className="bg-pink-500 h-1 w-full" />
      <div className="container mx-auto py-6 px-6 sm:px-0 flex justify-between items-baseline">
        <section>
          <Link to="/" className="no-underline">
            <span className="font-bold text-pink-500">SayThanks</span>{' '}
            <span className="uppercase text-sm tracking-wide text-grey-300">
              Dashboard
            </span>
          </Link>
        </section>

        <section className="flex items-baseline">
          <p className="text-pink-500 mr-2">{user.email}</p>
          <button
            className="hover:bg-grey-050 px-3 py-2 rounded-sm active:text-black text-grey-600"
            onClick={logout}
          >
            Logout
          </button>
        </section>
      </div>
    </nav>
  )
}

const mapState = ({ auth: { authenticated, user } }) => ({
  authenticated,
  user,
})

const mapDispatch = ({ auth }) => ({
  logout: auth.logout,
})

export default connect(
  mapState,
  mapDispatch
)(Nav)
