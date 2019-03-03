import React from 'react'
import { connect } from 'react-redux'

const Nav = ({ user, logout }) => {
  return (
    <nav className="bg-white border-b border-grey-100">
      <div className="bg-pink-400 h-1 w-full" />
      <div className="container mx-auto py-6 flex justify-between items-baseline">
        <section>
          <span className="font-bold text-pink-500">SayThanks</span>{' '}
          <span className="uppercase text-sm tracking-wide text-grey-300">
            Dashboard
          </span>
        </section>

        <section>
          <p>{user.email}</p>
          <button
            className="hover:bg-grey-100 px-3 py-2 rounded-sm active:text-black text-grey-800"
            onClick={logout}
          >
            Logout
          </button>
        </section>
      </div>
    </nav>
  )
}

const mapState = ({ auth: { user, authenticated } }) => ({
  user,
  authenticated,
})

const mapDispatch = ({ auth }) => ({
  logout: auth.logout,
})

export default connect(
  mapState,
  mapDispatch
)(Nav)
