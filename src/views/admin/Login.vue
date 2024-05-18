<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Sign in to Admin dashboard</h2>
      <form class="space-y-4" @submit.prevent="login">
        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            autocomplete="email"
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Email address"
            required
          />
        </div>
        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Password"
          />
        </div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-4 px-6 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
      <div class="mt-6 flex justify-between">
        <router-link to="/login" class="text-indigo-600 hover:text-indigo-500"> Sign in as Buyer </router-link>
        <router-link to="/register" class="text-indigo-600 hover:text-indigo-500"> Sign Up as Buyer </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from '@/plugins/http'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  setup() {
    const router = useRouter()
    return {
      router,
    }
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      try {
        const response = await post('/admin-login', {
          email: this.email,
          password: this.password,
        })
        if (response.status === 200) {
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('accessToken', response.data.token)
          localStorage.setItem('role', response.data.role)
          localStorage.setItem('adminData', JSON.stringify(response.data.admin))
          toast.success('Admin login successful')
          this.router.push({ name: 'home' })
        } else {
          if (response.data.errors) {
            const errorMessage = response.data.message || 'Invalid credentials'
            const errorDetails = Object.values(response.data.errors).flat().join(', ')
            toast.error(`${errorMessage}: ${errorDetails}`)
          } else {
            toast.error(response.data.message)
          }
        }
      } catch (error) {
        console.error('Login error:', error)
      }
    },
  },
}
</script>
