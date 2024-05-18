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
          <Disclosure v-slot="{ open }" :default-open="isUserManagementActive">
            <DisclosureButton
              class="px-4 py-3 flex items-center w-full hover:bg-gray-700"
              :class="open ? 'bg-gray-700' : ''"
            >
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Buyers Management
              <span class="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  :class="open ? 'transform rotate-90' : ''"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </DisclosureButton>
            <DisclosurePanel>
              <ul>
                <li>
                  <Disclosure v-slot="{ open }" :default-open="isUserActive">
                    <DisclosureButton
                      class="pl-8 pr-4 py-3 flex items-center w-full hover:bg-gray-700"
                      :class="open ? 'bg-gray-700' : ''"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                      </svg>
                      Buyers
                      <span class="ml-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          :class="open ? 'transform rotate-90' : ''"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </DisclosureButton>
                    <DisclosurePanel>
                      <ul>
                        <router-link v-slot="{ isExactActive, href, navigate }" to="/admin/users" custom>
                          <li
                            class="pl-12"
                            :class="[isExactActive ? 'bg-gray-500 text-gray-800' : 'hover:bg-gray-700']"
                          >
                            <a class="py-3 flex items-center" :href="href" @click="navigate">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                              </svg>
                              Buyers List
                            </a>
                          </li>
                        </router-link>
                      </ul>
                    </DisclosurePanel>
                  </Disclosure>
                </li>
              </ul>
            </DisclosurePanel>
          </Disclosure>
        </li>
        <li>
          <Disclosure v-slot="{ open }" :default-open="isCarsManagementActive">
            <DisclosureButton
              class="px-4 py-3 flex items-center w-full hover:bg-gray-700"
              :class="open ? 'bg-gray-700' : ''"
            >
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Cars Management
              <span class="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  :class="open ? 'transform rotate-90' : ''"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </DisclosureButton>
            <DisclosurePanel>
              <ul>
                <li>
                  <Disclosure v-slot="{ open }" :default-open="isCarsActive">
                    <DisclosureButton
                      class="pl-8 pr-4 py-3 flex items-center w-full hover:bg-gray-700"
                      :class="open ? 'bg-gray-700' : ''"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                      </svg>
                      Cars
                      <span class="ml-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          :class="open ? 'transform rotate-90' : ''"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </DisclosureButton>
                    <DisclosurePanel>
                      <ul>
                        <router-link v-slot="{ isExactActive, href, navigate }" to="/admin/cars" custom>
                          <li
                            class="pl-12"
                            :class="[isExactActive ? 'bg-gray-500 text-gray-800' : 'hover:bg-gray-700']"
                          >
                            <a class="py-3 flex items-center" :href="href" @click="navigate">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                              </svg>
                              Cars List
                            </a>
                          </li>
                        </router-link>
                      </ul>
                    </DisclosurePanel>
                  </Disclosure>
                </li>
              </ul>
            </DisclosurePanel>
          </Disclosure>
        </li>
        <li></li>
        <li>
          <router-link v-slot="{ isExactActive, href, navigate }" to="/admin/shipping-locations" custom>
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Shipping Locations
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
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },

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
