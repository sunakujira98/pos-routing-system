import { useState, useEffect } from 'react'

const useLocalStorageState = (key, defaultValue = '', {serialize = JSON.stringify, deserialize = JSON.parse} = {}) => {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

export { useLocalStorageState }