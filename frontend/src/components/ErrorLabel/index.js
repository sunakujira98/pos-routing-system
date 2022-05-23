import React from 'react'
import PropTypes from 'prop-types'

const ErrorLabel = ({children}) => {
  return (
    <p className='text-red-800 font-normal text-sm'>{children}</p>
  )
}

ErrorLabel.propTypes = {
  children: PropTypes.any
}

export default ErrorLabel