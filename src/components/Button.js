import React from 'react'
import classnames from 'classnames'

const styles = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-base',
}

const Button = ({ size = 'md', loading, children, onClick }) => (
  <button
    onClick={onClick}
    className={classnames({
      [styles.sm]: size === 'sm',
      [styles.md]: size === 'md',
      [styles.lg]: size === 'lg',
    })}
  >
    {loading ? <i className="fas fa-spinner fa-spin" /> : children}
  </button>
)

export default Button
