import React from 'react'

const Card = ({ children, className = '' }) => (
  <div className={'bg-white px-4 py-6  rounded shadow-lg ' + className}>
    {children}
  </div>
)

export default Card
