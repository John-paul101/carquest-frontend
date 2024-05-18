import { CapacitorHttp } from '@capacitor/core'
import { useRouter } from 'vue-router'

const router = useRouter()

const baseURL = 'http://127.0.0.1:8000/api'

const makeRequest = async (options, addToken = false) => {
  try {
    const token = localStorage.getItem('accessToken') // Retrieve token from localStorage
    const headers = {
      'Content-Type': 'application/json',
    }

    if (addToken && token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const finalOptions = {
      ...options,
      url: `${baseURL}${options.endpoint}`,
      headers,
      readTimeout: 10000,
      connectTimeout: 10000,
    }

    const response = await CapacitorHttp.request(finalOptions)

    if (response.status === 405 && token) {
      localStorage.removeItem('accessToken') // Remove token from localStorage
      router.push({ name: 'login' })
    }

    return response
  } catch (error) {
    localStorage.removeItem('accessToken') // Remove token from localStorage
    router.push({ name: 'login' })
    throw error
  }
}

export const get = async (endpoint) => {
  return makeRequest({ method: 'GET', endpoint })
}

export const userGet = async (endpoint) => {
  return makeRequest({ method: 'GET', endpoint }, true)
}

export const post = async (endpoint, data = {}) => {
  return makeRequest({ method: 'POST', endpoint, data })
}

export const userPost = async (endpoint, data = {}) => {
  return makeRequest({ method: 'POST', endpoint, data }, true)
}

export const userPut = async (endpoint, data = {}) => {
  return makeRequest({ method: 'PUT', endpoint, data }, true)
}

export const userPatch = async (endpoint, data = {}) => {
  return makeRequest({ method: 'PATCH', endpoint, data }, true)
}

export const userDelete = async (endpoint) => {
  return makeRequest({ method: 'DELETE', endpoint }, true)
}
