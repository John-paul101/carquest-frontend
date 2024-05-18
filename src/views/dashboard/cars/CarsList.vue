<template>
  <div class="px-4 mt-4 sm:px-8">
    <h1 class="text-3xl font-bold mb-6">Cars</h1>

    <div class="mb-6">
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex mb-4 sm:mb-0">
          <button
            @click="selectedLayout = 'horizontal'"
            :class="{ 'bg-blue-500 text-white': selectedLayout === 'horizontal' }"
            class="px-4 py-2 rounded-md mr-2 focus:outline-none"
          >
            Horizontal
          </button>
          <button
            @click="selectedLayout = 'stacked'"
            :class="{ 'bg-blue-500 text-white': selectedLayout === 'stacked' }"
            class="px-4 py-2 rounded-md focus:outline-none"
          >
            Stacked
          </button>
        </div>

        <div class="flex flex-col sm:flex-row w-full sm:w-auto">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by make, model, or year"
            class="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
          />
          <button
            @click="addNewCar"
            class="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none w-full sm:w-auto"
          >
            Add New Car
          </button>
        </div>
      </div>
    </div>
    <div v-if="filteredCars.length === 0" class="text-gray-600 mb-6">No cars found matching your search query.</div>

    <div v-else class="grid grid-cols-1 gap-6">
      <!-- Horizontal layout -->
      <div v-if="selectedLayout === 'horizontal'">
        <div v-for="car in filteredCars" :key="car.id" class="flex bg-white rounded-lg shadow-md mb-6">
          <div class="relative w-1/3 rounded-l-lg overflow-hidden">
            <img
              :src="JSON.parse(car.pictures)[0]"
              :alt="car.brand + ' ' + car.title"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute top-0 left-0 bg-gray-900 bg-opacity-70 text-white font-bold text-lg px-4 py-2 rounded-br-lg"
            >
              {{ formatPrice(car.price) }}
            </div>
          </div>
          <div class="w-2/3 p-4">
            <h2 class="text-xl font-bold mb-2">{{ car.brand }} {{ car.title }}</h2>
            <div class="flex justify-between items-center mb-2">
              <p class="text-gray-600">{{ car.year }}</p>
              <div class="flex flex-col items-end">
                <div class="flex items-center mb-1">
                  <span class="text-gray-600 mr-2">Customs:</span>
                  <span class="font-bold">{{ formatPrice(car.customs_price) }}</span>
                </div>
                <div class="flex items-center">
                  <span class="text-gray-600 mr-2">Qty:</span>
                  <span class="font-bold">{{ car.available_quantity }}</span>
                </div>
              </div>
            </div>
            <p class="mt-2">{{ car.description.slice(0, 100) + '...' }}</p>
            <button
              @click="delistCar(car.id)"
              class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
            >
              Delist Car
            </button>
          </div>
        </div>
      </div>
      <!-- Stacked layout -->
      <div v-if="selectedLayout === 'stacked'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="car in filteredCars" :key="car.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="relative">
            <img
              :src="JSON.parse(car.pictures)[0]"
              :alt="car.brand + ' ' + car.title"
              class="w-full h-48 object-cover"
            />
            <div
              class="absolute top-0 left-0 bg-gray-900 bg-opacity-70 text-white font-bold text-lg px-4 py-2 rounded-br-lg"
            >
              {{ formatPrice(car.price) }}
            </div>
          </div>
          <div class="p-4">
            <h2 class="text-xl font-bold mb-2">{{ car.brand }} {{ car.title }}</h2>
            <div class="flex justify-between items-center mb-2">
              <p class="text-gray-600">{{ car.year }}</p>
              <div class="flex flex-col items-end">
                <div class="flex items-center mb-1">
                  <span class="text-gray-600 mr-2">Customs:</span>
                  <span class="font-bold">{{ formatPrice(car.customs_price) }}</span>
                </div>
                <div class="flex items-center">
                  <span class="text-gray-600 mr-2">Qty:</span>
                  <span class="font-bold">{{ car.available_quantity }}</span>
                </div>
              </div>
            </div>
            <p class="mt-2">{{ car.description.slice(0, 100) + '...' }}</p>
            <button
              @click="delistCar(car.id)"
              class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
            >
              Delist Car
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userGet, userPost, userDelete } from '@/plugins/http'
import { toast } from 'vue3-toastify'
import Swal from 'sweetalert2'
import 'vue3-toastify/dist/index.css'
export default {
  data() {
    return {
      cars: [],
      form: {
        brand: '',
        title: '',
        description: '',
        colors: [],
        pictures: [],
        year: null,
        price: null,
        customs_price: null,
        available_quantity: null,
      },
      selectedLayout: 'horizontal',
      searchQuery: '',
    }
  },
  computed: {
    filteredCars() {
      return this.cars.filter((car) => {
        const searchRegex = new RegExp(this.searchQuery, 'i')
        return searchRegex.test(car.brand) || searchRegex.test(car.title) || searchRegex.test(car.year.toString())
      })
    },
  },
  mounted() {
    this.fetchCars()
  },

  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(price)
    },
    async fetchCars() {
      try {
        const response = await userGet('/admin-view-cars')
        this.cars = response.data.cars
      } catch (error) {
        console.error('Error fetching cars:', error)
      }
    },
    async delistCar(carId) {
      try {
        const confirmed = await Swal.fire({
          title: 'Are you sure?',
          text: 'This will delist the car from the website.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Delist',
        })

        if (confirmed.isConfirmed) {
          await userDelete(`/admin-delete-car/${carId}`)
          await this.fetchCars()
          toast.success('Car delisted successfully')
        }
      } catch (error) {
        console.error('Error delisting car:', error)
        toast.error('Failed to delist car')
      }
    },
    async addNewCar() {
      const steps = [
        'brand',
        'title',
        'description',
        'colors',
        'pictures',
        'year',
        'price',
        'customs_price',
        'available_quantity',
      ]

      const formData = {}

      for (const step of steps) {
        const result = await Swal.fire({
          title: `Enter ${step}`,
          input: step === 'description' ? 'textarea' : 'text',
          inputLabel: step.charAt(0).toUpperCase() + step.slice(1),
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return 'Please enter a value'
            }
          },
        })

        if (result.dismiss === Swal.DismissReason.cancel) {
          break
        }

        formData[step] = result.value
      }

      if (Object.keys(formData).length === steps.length) {
        // All fields are filled, submit the form
        try {
          formData.colors = formData.colors.split(',')
          formData.pictures = formData.pictures.split(',')
          formData.year = parseInt(formData.year)
          formData.price = parseFloat(formData.price)
          formData.customs_price = parseFloat(formData.customs_price)
          formData.available_quantity = parseInt(formData.available_quantity)

          const response = await userPost('/admin-add-cars', formData)
          if (response.status === 201) {
            // Handle success response
            await this.fetchCars()
            toast.success('Car added successfully')
          } else {
            // Handle error response
            // ...
          }
        } catch (error) {
          console.error('Error submitting form:', error)
        }
      }
    },
  },
}
</script>
