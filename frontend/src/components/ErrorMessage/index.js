import React from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = ({children}) => {
  return (
    <p className='text-red-800 font-normal text-sm'>{children}</p>
  )
}

ErrorMessage.propTypes = {
  children: PropTypes.any
}

export default ErrorMessage