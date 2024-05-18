<template>
  <div class="flex justify-between px-4 mt-4 sm:px-8">
    <h2 class="text-2xl text-gray-600">Shipping Management</h2>

    <div class="flex items-center space-x-1 text-xs">
      <router-link to="/" class="font-bold text-indigo-700">Home</router-link>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="text-gray-600">Shipping Management</span>
    </div>
  </div>

  <div class="p-4 mt-8 sm:px-8 sm:py-4">
    <div class="p-4 bg-white rounded">
      <div class="flex justify-between mb-4">
        <div>
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              id="search"
              v-model="searchQuery"
              type="search"
              class="w-full py-2 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-gray-500 focus:ring-gray-500 focus:z-10"
              placeholder="Search"
            />
          </div>
        </div>
        <div>
          <button
            @click="showAddLocationModal = true"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Add Shipping Location
          </button>
          <button
            @click="showAddMethodModal = true"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Shipping Method
          </button>
        </div>
      </div>

      <h3 class="text-xl font-bold mb-2">Shipping Locations</h3>
      <table class="w-full mt-2 text-gray-500">
        <thead class="border-b">
          <tr>
            <th class="p-2 text-left text-gray-600">NAME</th>
            <th class="text-right text-gray-600">ACTIONS</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="location in filteredShippingLocations" :key="location.id">
            <td class="flex items-center py-4">
              <div>{{ location.name }}</div>
            </td>
            <td class="text-right">
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton
                    class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-gray-500 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    Actions
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </MenuButton>
                </div>

                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="absolute right-0 w-32 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none"
                  >
                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                        <button
                          :class="[
                            active ? 'bg-blue-400 text-white' : 'text-gray-900',
                            'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                          ]"
                          @click="editShippingLocation(location)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 mr-2 text-violet-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </button>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <button
                          :class="[
                            active ? 'bg-red-400 text-white' : 'text-gray-900',
                            'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                          ]"
                          @click="deleteShippingLocation(location.id)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 mr-2 text-violet-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-xl font-bold mt-8 mb-2">Shipping Methods</h3>
      <table class="w-full mt-2 text-gray-500">
        <thead class="border-b">
          <tr>
            <th class="p-2 text-left text-gray-600">NAME</th>
            <th class="text-left text-gray-600">PRICE</th>
            <th class="text-left text-gray-600">LOCATION</th>
            <th class="text-right text-gray-600">ACTIONS</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="method in filteredShippingMethods" :key="method.id">
            <td class="flex items-center py-4">
              <div>{{ method.name }}</div>
            </td>
            <td>{{ method.price }}</td>
            <td>{{ getShippingLocationName(method.shipping_location_id) }}</td>
            <td class="text-right">
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton
                    class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-gray-500 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    Actions
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </MenuButton>
                </div>

                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="absolute right-0 w-32 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none"
                  >
                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                        <button
                          :class="[
                            active ? 'bg-blue-400 text-white' : 'text-gray-900',
                            'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                          ]"
                          @click="editShippingMethod(method)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 mr-2 text-violet-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </button>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <button
                          :class="[
                            active ? 'bg-red-400 text-white' : 'text-gray-900',
                            'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                          ]"
                          @click="deleteShippingMethod(method.id)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 mr-2 text-violet-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Add Shipping Location Modal -->
  <div
    v-if="showAddLocationModal"
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Add Shipping Location</h3>
              <div class="mt-2">
                <form @submit.prevent="addShippingLocation">
                  <div class="mb-4">
                    <label for="name" class="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                      id="name"
                      v-model="newShippingLocation.name"
                      type="text"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div class="flex justify-end">
                    <button
                      type="button"
                      class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                      @click="closeAddLocationModal"
                    >
                      Cancel
                    </button>
                    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Shipping Method Modal -->
  <div
    v-if="showAddMethodModal"
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Add Shipping Method</h3>
              <div class="mt-2">
                <form @submit.prevent="addShippingMethod">
                  <div class="mb-4">
                    <label for="name" class="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                      id="name"
                      v-model="newShippingMethod.name"
                      type="text"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div class="mb-4">
                    <label for="price" class="block text-gray-700 font-bold mb-2">Price</label>
                    <input
                      id="price"
                      v-model="newShippingMethod.price"
                      type="number"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter price"
                      required
                    />
                  </div>
                  <div class="mb-4">
                    <label for="location" class="block text-gray-700 font-bold mb-2">Location</label>
                    <select
                      id="location"
                      v-model="newShippingMethod.shipping_location_id"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option value="" disabled>Select location</option>
                      <option v-for="location in shippingLocations" :key="location.id" :value="location.id">
                        {{ location.name }}
                      </option>
                    </select>
                  </div>
                  <div class="flex justify-end">
                    <button
                      type="button"
                      class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                      @click="closeAddMethodModal"
                    >
                      Cancel
                    </button>
                    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import Swal from 'sweetalert2'
import { userGet, userPost, userPatch, userDelete } from '@/plugins/http'

export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },

  setup() {
    const shippingLocations = ref([])
    const shippingMethods = ref([])
    const searchQuery = ref('')
    const showAddLocationModal = ref(false)
    const showAddMethodModal = ref(false)
    const newShippingLocation = ref({
      name: '',
    })
    const newShippingMethod = ref({
      name: '',
      price: 0,
      shipping_location_id: '',
    })

    const fetchShippingLocations = async () => {
      try {
        const response = await userGet('/admin-view-shipping-locations')
        shippingLocations.value = response.data.shipping_locations
      } catch (error) {
        console.error('Error fetching shipping locations:', error)
      }
    }

    const fetchShippingMethods = async () => {
      try {
        const response = await userGet('/admin-view-shipping-methods')
        shippingMethods.value = response.data.shipping_methods
      } catch (error) {
        console.error('Error fetching shipping methods:', error)
      }
    }

    const addShippingLocation = async () => {
      try {
        const response = await userPost('/admin-add-shipping-location', newShippingLocation.value)
        shippingLocations.value.push(response.data.shipping_location)
        closeAddLocationModal()
        Swal.fire('Success', 'Shipping location added successfully.', 'success')
      } catch (error) {
        console.error('Error adding shipping location:', error)
        Swal.fire('Error', 'Failed to add shipping location.', 'error')
      }
    }

    const addShippingMethod = async () => {
      try {
        const response = await userPost('/admin-add-shipping-method', newShippingMethod.value)
        shippingMethods.value.push(response.data.shipping_method)
        closeAddMethodModal()
        Swal.fire('Success', 'Shipping method added successfully.', 'success')
      } catch (error) {
        console.error('Error adding shipping method:', error)
        Swal.fire('Error', 'Failed to add shipping method.', 'error')
      }
    }

    const editShippingLocation = async (location) => {
      try {
        const { value: formData } = await Swal.fire({
          title: 'Edit Shipping Location',
          html: `<input id="name" class="swal2-input" placeholder="Name" value="${location.name}">`,
          focusConfirm: false,
          preConfirm: () => {
            return {
              name: document.getElementById('name').value,
            }
          },
          customClass: {
            popup: 'swal2-wide',
          },
        })

        if (formData) {
          const response = await userPatch(`/admin-update-shipping-location/${location.id}`, formData)
          const index = shippingLocations.value.findIndex((l) => l.id === location.id)
          shippingLocations.value.splice(index, 1, response.data.shipping_location)
          Swal.fire('Success', 'Shipping location updated successfully.', 'success')
        }
      } catch (error) {
        console.error('Error updating shipping location:', error)
        Swal.fire('Error', 'Failed to update shipping location.', 'error')
      }
    }

    const editShippingMethod = async (method) => {
      try {
        const { value: formData } = await Swal.fire({
          title: 'Edit Shipping Method',
          html: `<input id="name" class="swal2-input" placeholder="Name" value="${method.name}">
         <input id="price" class="swal2-input" placeholder="Price" type="number" value="${method.price}">
         <select id="location" class="swal2-select">
           <option value="" disabled>Select location</option>
           ${shippingLocations.value
             .map(
               (location) => `
             <option value="${location.id}" ${location.id === method.shipping_location_id ? 'selected' : ''}>
               ${location.name}
             </option>
           `
             )
             .join('')}
         </select>`,
          focusConfirm: false,
          preConfirm: () => {
            return {
              name: document.getElementById('name').value,
              price: parseFloat(document.getElementById('price').value),
              shipping_location_id: parseInt(document.getElementById('location').value),
            }
          },
          customClass: {
            popup: 'swal2-wide',
          },
        })

        if (formData) {
          const response = await userPatch(`/admin-update-shipping-method/${method.id}`, formData)
          const index = shippingMethods.value.findIndex((m) => m.id === method.id)
          shippingMethods.value.splice(index, 1, response.data.shipping_method)
          Swal.fire('Success', 'Shipping method updated successfully.', 'success')
        }
      } catch (error) {
        console.error('Error updating shipping method:', error)
        Swal.fire('Error', 'Failed to update shipping method.', 'error')
      }
    }

    const deleteShippingLocation = async (id) => {
      try {
        const confirmed = await Swal.fire({
          title: 'Are you sure?',
          text: 'This will delete the shipping location from the system.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Delete',
        })

        if (confirmed.isConfirmed) {
          await userDelete(`/admin-delete-shipping-location/${id}`)
          const index = shippingLocations.value.findIndex((l) => l.id === id)
          shippingLocations.value.splice(index, 1)
          await fetchShippingLocations()
          await fetchShippingMethods()
          Swal.fire('Deleted!', 'The shipping location has been deleted.', 'success')
        }
      } catch (error) {
        console.error('Error deleting shipping location:', error)
        Swal.fire('Error', 'Failed to delete the shipping location.', 'error')
      }
    }

    const deleteShippingMethod = async (id) => {
      try {
        const confirmed = await Swal.fire({
          title: 'Are you sure?',
          text: 'This will delete the shipping method from the system.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Delete',
        })

        if (confirmed.isConfirmed) {
          await userDelete(`/admin-delete-shipping-method/${id}`)
          const index = shippingMethods.value.findIndex((m) => m.id === id)
          shippingMethods.value.splice(index, 1)
          await fetchShippingLocations()
          await fetchShippingMethods()
          Swal.fire('Deleted!', 'The shipping method has been deleted.', 'success')
        }
      } catch (error) {
        console.error('Error deleting shipping method:', error)
        Swal.fire('Error', 'Failed to delete the shipping method.', 'error')
      }
    }

    const closeAddLocationModal = () => {
      newShippingLocation.value = {
        name: '',
      }
      showAddLocationModal.value = false
    }

    const closeAddMethodModal = () => {
      newShippingMethod.value = {
        name: '',
        price: 0,
        shipping_location_id: '',
      }
      showAddMethodModal.value = false
    }

    const filteredShippingLocations = computed(() => {
      if (!searchQuery.value) return shippingLocations.value

      const regex = new RegExp(searchQuery.value, 'i')
      return shippingLocations.value.filter((location) => regex.test(location.name))
    })

    const filteredShippingMethods = computed(() => {
      if (!searchQuery.value) return shippingMethods.value

      const regex = new RegExp(searchQuery.value, 'i')
      return shippingMethods.value.filter((method) => regex.test(method.name))
    })

    const getShippingLocationName = (locationId) => {
      const location = shippingLocations.value.find((l) => l.id === locationId)
      return location ? location.name : ''
    }

    fetchShippingLocations()
    fetchShippingMethods()

    return {
      shippingLocations,
      shippingMethods,
      searchQuery,
      showAddLocationModal,
      showAddMethodModal,
      newShippingLocation,
      newShippingMethod,
      addShippingLocation,
      addShippingMethod,
      editShippingLocation,
      editShippingMethod,
      deleteShippingLocation,
      deleteShippingMethod,
      closeAddLocationModal,
      closeAddMethodModal,
      filteredShippingLocations,
      filteredShippingMethods,
      getShippingLocationName,
    }
  },
}
</script>
