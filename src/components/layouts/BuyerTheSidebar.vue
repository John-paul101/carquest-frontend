<template>
  <aside class="hidden w-64 bg-gray-800 sm:block">
    <div class="py-3 text-2xl uppercase text-center tracking-widest bg-gray-900 border-b-2 border-gray-800 mb-8">
      <router-link to="/admin/" class="text-white">CarQUEST</router-link>
    </div>
    <nav class="text-sm text-gray-300">
      <ul class="flex flex-col">
        <li class="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-bold">Section</li>
        <router-link v-slot="{ isExactActive, href, navigate }" to="/admin/" custom>
          <li class="px-4 cursor-pointer" :class="[isExactActive ? 'bg-gray-500 text-gray-800' : 'hover:bg-gray-700']">
            <a class="py-3 flex items-center" :href="href" @click="navigate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
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
              Dashboard
            </a>
          </li>
        </router-link>
        <li>
          <router-link v-slot="{ isExactActive, href, navigate }" to="/" custom>
            <li
              class="px-4 cursor-pointer"
              :class="[isExactActive ? 'bg-gray-500 text-gray-800' : 'hover:bg-gray-700']"
            >
              <a class="py-3 flex items-center" :href="href" @click="navigate">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                Buy Car
              </a>
            </li>
          </router-link>
        </li>
        <li>
          <router-link v-slot="{ isExactActive, href, navigate }" to="/buyer/track-car" custom>
            <li
              class="px-4 cursor-pointer"
              :class="[isExactActive ? 'bg-gray-500 text-gray-800' : 'hover:bg-gray-700']"
            >
              <a class="py-3 flex items-center" :href="href" @click="navigate">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Track Car
              </a>
            </li>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()

    const isUserManagementActive = computed(() => {
      const names = ['user-list', 'user-detail']
      return names.includes(route.name)
    })

    const isCarsManagementActive = computed(() => {
      const names = ['cars-list', 'car-detail']
      return names.includes(route.name)
    })

    const isUserActive = computed(() => {
      const names = ['user-list', 'user-detail']
      return names.includes(route.name)
    })

    const isCarsActive = computed(() => {
      const names = ['cars-list', 'car-detail']
      return names.includes(route.name)
    })

    return {
      route,
      isUserManagementActive,
      isCarsManagementActive,
      isUserActive,
      isCarsActive,
    }
  },
}
</script>
