import React from 'react'
import Card from './Card'

const PageTitleCard = ({ title, subtitle, children, className }) => (
  <Card className={className}>
    <h1 className="text-2xl mb-2 text-grey-800">{title}</h1>

    {children}
  </Card>
)

export default PageTitleCard
