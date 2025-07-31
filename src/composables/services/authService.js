// authService.js

/**
 * Enregistre les infos utilisateur dans localStorage
 */
export function saveUserSession(user, token) {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('user_id', user.id)
  localStorage.setItem('_token', token)
  document.cookie = `token=${token}`
}

/**
 * Supprime les infos utilisateur (logout)
 */
export function clearUserSession() {
  localStorage.removeItem('user')
  localStorage.removeItem('user_id')
  localStorage.removeItem('_token')
  document.cookie = 'token=; Max-Age=0'
}

/**
 * Récupère l'utilisateur connecté
 */
export function getUser() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

/**
 * Vérifie si l'utilisateur est connecté
 */
export function isLoggedIn() {
  return !!localStorage.getItem('_token')
}

/**
 * API - Login utilisateur
 */
export async function loginUser(apiUrl, loginForm) {
  const { default: axios } = await import('axios')

  const response = await axios.post(`${apiUrl}auth/login/`, loginForm)
  const { user, key } = response.data
  saveUserSession(user, key)
  return user
}

/**
 * API - Inscription nouvel utilisateur
 */
export async function registerUser(apiUrl, signUpForm) {
  const { default: axios } = await import('axios')

  const response = await axios.post(`${apiUrl}register-user`, signUpForm)
  const user = response.data
  saveUserSession(user, user.token)
  return user
}

/**
 * API - Envoi demande reset password
 */
export async function requestPasswordReset(apiUrl, email, companyId) {
  const { default: axios } = await import('axios')

  const payload = {
    email: email.toLowerCase(),
    company_id: companyId,
    website: window.location.origin.split('/')[2],
  }

  const response = await axios.post(`${apiUrl}website/reset-password`, payload)
  return response.status === 200
}

/**
 * API - Confirmer nouveau mot de passe avec token
 */
export async function confirmPasswordReset(apiUrl, username, token, newPassword, confirmPassword) {
  const { default: axios } = await import('axios')

  const payload = {
    username,
    password: newPassword,
    confirm_password: confirmPassword,
    token,
  }

  const response = await axios.post(`${apiUrl}website/reset-password-confirm`, payload)
  const { user, token: newToken } = response.data
  saveUserSession(user, newToken)
  return user
}

