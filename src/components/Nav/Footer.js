import React from 'react'
import { Link } from 'react-router-dom'

const LowkeyLink = props => (
  <Link {...props} className="no-underline text-grey-400 text-sm mx-4" />
)

const Footer = () => (
  <footer>
    <div className="container mx-auto py-6 px-6 sm:px-0 flex items-baseline justify-between text-center">
      <section className="">
        <Link to="/" className="no-underline">
          <span className="font-bold text-grey-500">SayThanks</span>
        </Link>
      </section>
      <section>
        <LowkeyLink to="/">Privacy</LowkeyLink>
        <LowkeyLink to="/">Terms</LowkeyLink>
        <LowkeyLink to="/">Help</LowkeyLink>
      </section>
    </div>
  </footer>
)

export default Footer
