import awsmobile from './aws-exports'
import { Auth, Amplify } from 'aws-amplify'
import { setStorage, resetStorage, deleteStorage } from './storage'

Amplify.configure(awsmobile)

const login = (username: string, password: string) => {
  return Auth.signIn(username, password)
    .then(async (user) => {
      const token = user.signInUserSession.idToken.jwtToken
      const refreshToken = user.signInUserSession.refreshToken.token
      const accessToken = user.signInUserSession.accessToken.jwtToken
      return await Promise.allSettled([
        setStorage('token', token),
        setStorage('refreshToken', refreshToken),
        setStorage('accessToken', accessToken),
      ]).then(() => user)
    })
    .catch((error: any) => {
      throw error
    })
}

const logout = () => {
  return Auth.signOut()
    .then(async (res) => {
      resetStorage().then((res) => {
        return res
      })
    })
    .catch((error: any) => {
      throw error
    })
}

export { login, logout }
