// auth.js

import { userPost } from '@/plugins/http'
import { useRouter } from 'vue-router'

const router = useRouter()

export function isAuthenticated() {
  return !!localStorage.getItem('accessToken')
}

export function getUserRole() {
  return localStorage.getItem('role')
}

async function logoutAdmin() {
  try {
    const logoutEndpoint = '/admin-logout'
    await userPost(logoutEndpoint)
  } catch (error) {
    console.error('Logout failed for admin:', error)
    // Handle the error appropriately (e.g., show an error message)
    throw error
  }
}

async function logoutBuyer() {
  try {
    const logoutEndpoint = '/buyer-logout'
    await userPost(logoutEndpoint)
  } catch (error) {
    console.error('Logout failed for buyer:', error)
    // Handle the error appropriately (e.g., show an error message)
    throw error
  }
}

function removeAdminData() {
  localStorage.removeItem('adminData')
}

function removeBuyerData() {
  localStorage.removeItem('buyerData')
}

export async function logout() {
  const accessToken = localStorage.getItem('accessToken')
  const userRole = getUserRole()

  if (!accessToken) {
    // If no access token is found, redirect to the appropriate login page based on the user role
    if (userRole === 'admin') {
      router.push({ name: 'admin-login' })
    } else if (userRole === 'buyer') {
      router.push({ name: 'buyer-login' })
    }
    return
  }

  if (userRole === 'admin') {
    try {
      await logoutAdmin()
      localStorage.removeItem('accessToken')
      localStorage.removeItem('role')
      removeAdminData()
      router.push({ name: 'admin-login' })
    } catch (error) {
      console.error('Logout failed:', error)
      // Handle the error appropriately (e.g., show an error message)
    }
  } else if (userRole === 'buyer') {
    try {
      await logoutBuyer()
      localStorage.removeItem('accessToken')
      localStorage.removeItem('role')
      removeBuyerData()
      router.push({ name: 'buyer-login' })
    } catch (error) {
      console.error('Logout failed:', error)
      // Handle the error appropriately (e.g., show an error message)
    }
  } else {
    // If the user role is neither admin nor buyer, redirect to the buyer login page
    localStorage.removeItem('accessToken')
    router.push({ name: 'buyer-login' })
  }
}
