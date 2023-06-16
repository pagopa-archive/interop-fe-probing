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
    throw error
  }
}

async function refreshToken() {
  try {
    const user = await Auth.currentAuthenticatedUser()
    const refreshToken = sessionStorage.getItem('refreshToken')
    user.refreshSession(refreshToken!, () => {
      sessionStorage.setItem(
        'token',
        user
          .getSignInUserSession()
          .getIdToken()
          .getJwtToken()!
      )
      sessionStorage.setItem(
        'accessToken',
        user
          .getSignInUserSession()
          .getAccessToken()
          .getJwtToken()!
      )
    })
  } catch (error) {
    throw error
  }
}

async function logout() {
  try {
    await Auth.signOut()
    sessionStorage.clear()
  } catch (error) {
    throw error
  }
}

async function passwordRecovery(username: string) {
  try {
    await Auth.forgotPassword(username)
  } catch (error) {
    throw error
  }
}

async function passwordReset(username: string, code: string, new_password: string) {
  try {
    await Auth.forgotPasswordSubmit(username, code, new_password)
  } catch (error) {
    throw error
  }
}

export { login, logout, passwordRecovery, passwordReset, refreshToken }
