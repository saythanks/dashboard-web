import React from 'react'
import './ThemePicker.scss'

// expects array of pairs [[bg, fg], ...]
const ThemePicker = ({ colors, value, onChange, className }) => {
  return (
    <div className={'-mx-4 -my-4 theme-picker ' + className}>
      {colors.map(pair => (
        <button
          className={
            'color w-8 h-8 rounded-full inline-block mx-4 my-4 ' +
            (value[0] === pair[0] && value[1] === pair[1] ? '-selected' : '')
          }
          onClick={() => onChange(pair)}
          style={{ background: pair[0], border: `solid 2px ${pair[1]}` }}
        />
      ))}
    </div>
  )
}

export default ThemePicker
