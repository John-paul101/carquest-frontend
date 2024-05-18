<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Sign up to Buyer dashboard</h2>
      <form class="space-y-4" @submit.prevent="registerBuyer">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <input
            id="name"
            v-model="name"
            name="name"
            type="text"
            autocomplete="name"
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Name"
            required
            maxlength="255"
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
            :class="{ 'border-red-500': emailError }"
          />
          <span v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</span>
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
            minlength="6"
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
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 19a2 2 0 01-4 0"
              />
            </svg>
          </span>
          <input
            id="nin"
            v-model="nin"
            name="nin"
            type="text"
            autocomplete="nin"
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="NIN"
            required
            maxlength="255"
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </span>
          <input
            id="address"
            v-model="address"
            name="address"
            type="text"
            autocomplete="address"
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Address"
            required
            maxlength="255"
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </span>
          <input
            id="phone"
            v-model="phone"
            name="phone"
            type="tel"
            autocomplete="tel"
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Phone Number"
            required
            maxlength="255"
          />
        </div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-4 px-6 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div class="mt-6 flex justify-between">
        <router-link to="/login" class="text-indigo-600 hover:text-indigo-500"> Sign in as Buyer </router-link>
        <router-link to="/admin/login" class="text-indigo-600 hover:text-indigo-500"> Sign in as Admin </router-link>
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
      name: '',
      email: '',
      password: '',
      nin: '',
      address: '',
      phone: '',
      emailError: '',
    }
  },
  methods: {
    async registerBuyer() {
      try {
        const response = await post('/buyer-register', {
          name: this.name,
          email: this.email,
          password: this.password,
          nin: this.nin,
          address: this.address,
          phone: this.phone,
        })
        if (response.status === 200) {
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('accessToken', response.data.token)
          localStorage.setItem('role', 'buyer')
          localStorage.setItem('buyerData', JSON.stringify(response.data.buyer))
          toast.success('Buyer registration successful')
          this.router.push({ name: 'home' })
        } else {
          if (response.data.errors) {
            const errorMessage = response.data.message || 'Invalid input'
            const errorDetails = Object.values(response.data.errors).flat().join(', ')
            toast.error(`${errorMessage}: ${errorDetails}`)
            if (response.data.errors.email) {
              this.emailError = response.data.errors.email[0]
            } else {
              this.emailError = ''
            }
          } else {
            toast.error(response.data.message)
          }
        }
      } catch (error) {
        console.error('Registration error:', error)
      }
    },
  },
}
</script>
