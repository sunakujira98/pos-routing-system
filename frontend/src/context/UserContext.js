import { createContext , useMemo, useCallback } from 'react'

import { useLocalStorageState } from '../hooks/use-storage'

export const UserContext = createContext(null)

const UserProvider = ({ children }) => {
  const [user, storeUser] = useLocalStorageState('user', [])

  const resetUser = useCallback(
    () => storeUser(),
    [storeUser]
  )

  const value = useMemo(() => {
    return { user, storeUser, resetUser }
  }, [user, storeUser, resetUser])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider