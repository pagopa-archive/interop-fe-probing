import awsmobile from './aws-exports'
import { Auth, Amplify } from 'aws-amplify'

Amplify.configure(awsmobile)

async function login(username: string, password: string) {
  try {
    const user = await Auth.signIn(username, password)
    const token = user.signInUserSession.idToken.jwtToken
    const refreshToken = user.signInUserSession.refreshToken.token
    const accessToken = user.signInUserSession.accessToken.jwtToken
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('refreshToken', refreshToken)
    sessionStorage.setItem('accessToken', accessToken)
    return user
  } catch (error) {
    console.log('error signing in', error)
  }
}

async function logout() {
  try {
    await Auth.signOut()
    sessionStorage.clear()
  } catch (error) {
    console.log('error signing out: ', error)
  }
}

export { login, logout }
