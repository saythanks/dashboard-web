import React from 'react'
import Card from './Card'

const PageTitleCard = ({ title, subtitle, children, className }) => (
  <Card className={className}>{children}</Card>
)

export default PageTitleCard
