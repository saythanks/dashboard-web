import React from 'react'

export const FormGroup = ({ className, title, children }) => (
  <div className={'mb-6 ' + className}>
    {!!title && (
      <label
        htmlFor={title}
        className="text-sm text-grey-600 font-bold mb-2 block "
      >
        {title}
      </label>
    )}
    {children}
  </div>
)

export const Input = ({
  className,
  title,
  type = 'text',
  value,
  onChange,
  ...props
}) => (
  <FormGroup title={title} className={className}>
    <input
      type={type}
      value={value}
      className="block focus:outline-none w-full bg-grey-050 rounded-sm px-4 py-2 text-lg "
      onChange={e => onChange(e.target.value)}
      {...props}
    />
  </FormGroup>
)
