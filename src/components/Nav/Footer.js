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
        <a href="https://www.saythanks.me/privacy" className="no-underline text-grey-400 text-sm mx-4">Privacy</a>
        <a href="https://www.saythanks.me/terms" className="no-underline text-grey-400 text-sm mx-4">Terms</a>
        <a href="mailto:help@saythanks.me?subject=Help Request for SayThanks" className="no-underline text-grey-400 text-sm mx-4">Help</a>
      </section>
    </div>
  </footer>
)

export default Footer
