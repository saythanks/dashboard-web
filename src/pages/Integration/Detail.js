import React, { useEffect } from 'react'
import { connect } from 'react-redux'

const Detail = ({ payable, load }) => {
  console.log(payable)
  useEffect(() => {
    load(payable.id)
  })

  return <div>{JSON.stringify(payable)}</div>
}

const mapState = state => ({
  payable: state.payables.current,
})

const mapDispatch = (dispatch, { payable }) => ({
  load: () => dispatch.payables.get,
})

export default connect(
  mapState,
  mapDispatch
)(Detail)
