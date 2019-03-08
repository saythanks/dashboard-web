import React from 'react'
import { Link } from 'react-router-dom'

const IntegrationRow = ({ payable, app }) => (
  <Link
    to={`/sites/${app.id}/payables/${payable.id}`}
    className="block no-underline text-black p-4 flex justify-between items-center hover:bg-grey-050"
  >
    <section className="flex">
      <p className="text-xl mr-4 font-medium flex items-baseline">
        {payable.display_name}
      </p>
      <div className="no-underline text-sm block mt-1">
        <i className="fas fa-link text-xs mx-1 pb-px text-grey-200" />
        <span className="text-grey-400">{payable.permalink}</span>
      </div>
    </section>
    <section>
      <p className="text-2xl font-light text-grey-500">
        {payable.display_price}&cent;
      </p>
    </section>
  </Link>
)

const IntegrationList = ({ payables, app }) => {
  console.log(payables)
  return (
    <div className="bg-white shadow rounded">
      {payables.map(payable => (
        <IntegrationRow key={payable.id} payable={payable} app={app} />
      ))}
    </div>
  )
}

export default IntegrationList
