import React from 'react'
import classnames from 'classnames'

const sizes = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-base',
}

const Button = ({
  size = 'md',
  loading,
  children,
  className,
  onClick,
  block = false,
} = {}) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={classnames(
      {
        [sizes.sm]: size === 'sm',
        [sizes.md]: size === 'md',
        [sizes.lg]: size === 'lg',
      },
      'rounded-sm',
      { block: block },
      className
    )}
  >
    {loading ? <i className="fas fa-spinner fa-spin" /> : children}
  </button>
)

export const PrimaryButton = ({ children, className, ...props } = {}) => (
  <Button {...props} className={'bg-pink-400 text-white ' + className}>
    {children}
  </Button>
)

export const SecondaryButton = ({ children, className, ...props } = {}) => (
  <Button
    {...props}
    className={
      'bg-white btn-floating rounded-full active:text-pink-500' +
      'flex items-center uppercase text-sm font-semibold text-pink-500 ' +
      className
    }
  >
    {children}
  </Button>
)

export default PrimaryButton
