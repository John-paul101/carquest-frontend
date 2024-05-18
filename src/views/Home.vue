<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div style="min-height: 100vh; background-color: #f8f8f8">
    <!-- Header -->
    <header
      style="
        background-color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 1rem 0;
      "
    >
      <div
        style="
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div style="display: flex; align-items: center">
          <router-link to="/" style="font-size: 1.5rem; font-weight: bold; color: #1a202c; text-decoration: none"
            >CarQuest</router-link
          >
        </div>
        <nav style="display: flex; align-items: center">
          <div class="relative" style="margin-left: 1.5rem">
            <div
              style="display: flex; align-items: center; color: #1a202c; transition: color 0.3s; cursor: pointer"
              @click="toggleCartDropdown"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="height: 1.25rem; width: 1.25rem; display: inline-block; margin-right: 0.25rem"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Cart ({{ cartItems.length }})
            </div>
            <div
              v-if="showCartDropdown"
              style="
                position: absolute;
                top: 100%;
                right: 0;
                background-color: white;
                border-radius: 0.5rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                min-width: 250px;
                padding: 1rem;
                z-index: 10;
              "
            >
              <ul v-if="cartItems.length > 0">
                <li
                  v-for="item in cartItems"
                  :key="item.id"
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                    border-bottom: 1px solid #e2e8f0;
                    padding-bottom: 0.5rem;
                  "
                >
                  <div>
                    <span style="font-weight: 500; display: block">{{ item.brand }} {{ item.title }}</span>
                    <span style="color: #718096; font-size: 0.875rem">NGN{{ formatPrice(item.price) }}</span>
                  </div>
                  <button
                    style="
                      background-color: transparent;
                      color: #e53e3e;
                      padding: 0.25rem 0.5rem;
                      border-radius: 0.25rem;
                      transition: background-color 0.3s;
                      cursor: pointer;
                      font-size: 0.875rem;
                    "
                    @click.stop="removeFromCart(item)"
                  >
                    Remove
                  </button>
                </li>
              </ul>
              <p v-else style="color: #718096; text-align: center">Your cart is empty.</p>
              <router-link
                to="/cart"
                style="
                  display: block;
                  background-color: #4a5568;
                  color: white;
                  padding: 0.5rem 1rem;
                  border-radius: 0.375rem;
                  text-align: center;
                  margin-top: 1rem;
                  text-decoration: none;
                  transition: background-color 0.3s;
                "
                >View Cart</router-link
              >
            </div>
          </div>
          <template v-if="!isLoggedIn">
            <router-link
              to="/login"
              style="
                color: #1a202c;
                transition: color 0.3s;
                margin-left: 1.5rem;
                text-decoration: none;
                font-weight: 500;
              "
              >Login</router-link
            >
            <router-link
              to="/register"
              style="
                background-color: #1a202c;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 0.375rem;
                transition: background-color 0.3s;
                margin-left: 1.5rem;
                text-decoration: none;
              "
              >Register</router-link
            >
          </template>
          <template v-else>
            <router-link
              :to="userRole === 'admin' ? '/admin' : '/buyer'"
              style="
                color: #1a202c;
                transition: color 0.3s;
                margin-left: 1.5rem;
                text-decoration: none;
                font-weight: 500;
              "
              >Dashboard</router-link
            >
            <button
              style="
                color: #1a202c;
                transition: color 0.3s;
                margin-left: 1.5rem;
                cursor: pointer;
                font-weight: 500;
                background-color: transparent;
                border: none;
              "
              @click="logout"
            >
              Logout
            </button>
          </template>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section style="position: relative; height: 100vh; overflow: hidden">
      <div class="hero-slider">
        <div
          style="
            background-image: url('https://hips.hearstapps.com/hmg-prod/images/2024-hyundai-sonata-n-line-101-64ef8c4d94261.jpg');
            background-size: cover;
            background-position: center;
            height: 100vh;
          "
        ></div>
        <div
          style="
            background-image: url('https://media.ed.edmunds-media.com/land-rover/range-rover-velar/2023/oem/2023_land-rover_range-rover-velar_4dr-suv_p340-r-dynamic-s_fq_oem_1_1600.jpg');
            background-size: cover;
            background-position: center;
            height: 100vh;
          "
        ></div>
        <!-- Add more <div> elements for additional hero images -->
      </div>
      <div
        style="
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          text-align: center;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
        "
      >
        <h1
          style="
            font-size: 4rem;
            font-weight: bold;
            color: white;
            margin-bottom: 1rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          "
        >
          Find Your Dream Car
        </h1>
        <p
          style="
            font-size: 1.5rem;
            color: white;
            margin-bottom: 2rem;
            max-width: 600px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          "
        >
          Discover our extensive collection of premium vehicles and experience the joy of driving like never before.
        </p>
        <button
          style="
            background-color: white;
            color: #1a202c;
            padding: 1rem 2rem;
            border-radius: 0.375rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
            transition: transform 0.3s;
            text-decoration: none;
            font-size: 1.25rem;
            border: none;
            cursor: pointer;
          "
          @click="scrollToAllCars"
        >
          Explore Cars
        </button>
      </div>
    </section>

    <!-- Featured Cars Section -->
    <section style="padding: 6rem 0; background-color: white">
      <div style="max-width: 1280px; margin: 0 auto; padding: 0 1rem">
        <h2 style="font-size: 2.5rem; font-weight: bold; color: #1a202c; margin-bottom: 3rem; text-align: center">
          Featured Cars
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem">
          <div
            v-for="car in featuredCars"
            :key="car.id"
            style="
              background-color: white;
              border-radius: 0.5rem;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
              overflow: hidden;
              transition: transform 0.3s;
              cursor: pointer;
            "
            @click="showCarDetails(car)"
          >
            <div style="position: relative">
              <img
                :src="JSON.parse(car.pictures)[0]"
                :alt="car.brand + ' ' + car.title"
                style="width: 100%; height: 300px; object-fit: cover"
              />
              <div
                style="
                  position: absolute;
                  top: 0;
                  right: 0;
                  background-color: #1a202c;
                  color: white;
                  padding: 0.5rem 1rem;
                  margin: 1rem;
                  border-radius: 0.375rem;
                  font-size: 0.75rem;
                  font-weight: bold;
                "
              >
                NGN{{ formatPrice(car.price) }}
              </div>
            </div>
            <div style="padding: 1.5rem">
              <h3 style="font-size: 1.5rem; font-weight: bold; color: #1a202c; margin-bottom: 0.5rem">
                {{ car.brand }} {{ car.title }}
              </h3>
              <p style="color: #718096; margin-bottom: 1rem">{{ car.description.slice(0, 100) + '...' }}</p>
              <div style="display: flex; align-items: center; margin-bottom: 1rem">
                <span style="font-weight: 500; margin-right: 1rem">Colors:</span>
                <div style="display: flex">
                  <div
                    v-for="color in JSON.parse(car.colors)"
                    :key="color"
                    :style="{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      marginRight: '0.5rem',
                    }"
                  ></div>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem">
                <span style="font-weight: 500">Year:</span>
                <span>{{ car.year }}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem">
                <span style="font-weight: 500">Customs Price:</span>
                <span>NGN{{ formatPrice(car.customs_price) }}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center">
                <span style="font-weight: 500">Available Quantity:</span>
                <span>{{ car.available_quantity }}</span>
              </div>
              <button
                style="
                  background-color: #1a202c;
                  color: white;
                  padding: 0.75rem 1.5rem;
                  border-radius: 0.375rem;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
                  transition: background-color 0.3s;
                  cursor: pointer;
                  font-size: 1.25rem;
                  margin-top: 1.5rem;
                  width: 100%;
                  border: none;
                "
                @click.stop="addToCart(car)"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All Cars Section -->
    <section id="all-cars-section" style="padding: 6rem 0; background-color: #f8f8f8">
      <div style="max-width: 1280px; margin: 0 auto; padding: 0 1rem">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem">
          <h2 style="font-size: 2.5rem; font-weight: bold; color: #1a202c">All Cars</h2>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by brand, title, or year"
            style="padding: 0.5rem; font-size: 1rem; border: 1px solid #ccc; border-radius: 4px"
          />
        </div>
        <div
          v-if="filteredCars && filteredCars.length === 0"
          style="text-align: center; color: #718096; margin-bottom: 2rem"
        >
          No cars found matching your search query.
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem">
          <div
            v-for="car in filteredCars"
            :key="car.id"
            style="
              background-color: white;
              border-radius: 0.5rem;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
              overflow: hidden;
              transition: transform 0.3s;
              cursor: pointer;
            "
            @click="showCarDetails(car)"
          >
            <div style="position: relative">
              <img
                :src="JSON.parse(car.pictures)[0]"
                :alt="car.brand + ' ' + car.title"
                style="width: 100%; height: 200px; object-fit: cover"
              />
              <div
                style="
                  position: absolute;
                  top: 0;
                  right: 0;
                  background-color: #1a202c;
                  color: white;
                  padding: 0.5rem 1rem;
                  margin: 1rem;
                  border-radius: 0.375rem;
                  font-size: 0.75rem;
                  font-weight: bold;
                "
              >
                NGN{{ formatPrice(car.price) }}
              </div>
            </div>
            <div style="padding: 1.5rem">
              <h3 style="font-size: 1.25rem; font-weight: bold; color: #1a202c; margin-bottom: 0.5rem">
                {{ car.brand }} {{ car.title }}
              </h3>
              <p style="color: #718096; margin-bottom: 1rem">{{ car.description.slice(0, 100) + '...' }}</p>
              <div style="display: flex; align-items: center; margin-bottom: 1rem">
                <span style="font-weight: 500; margin-right: 1rem">Colors:</span>
                <div style="display: flex">
                  <div
                    v-for="color in JSON.parse(car.colors)"
                    :key="color"
                    :style="{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      marginRight: '0.5rem',
                    }"
                  ></div>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem">
                <span style="font-weight: 500">Year:</span>
                <span>{{ car.year }}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem">
                <span style="font-weight: 500">Customs Price:</span>
                <span>NGN{{ formatPrice(car.customs_price) }}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center">
                <span style="font-weight: 500">Available Quantity:</span>
                <span>{{ car.available_quantity }}</span>
              </div>
              <button
                style="
                  background-color: #1a202c;
                  color: white;
                  padding: 0.5rem 1rem;
                  border-radius: 0.375rem;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
                  transition: background-color 0.3s;
                  cursor: pointer;
                  font-size: 1rem;
                  margin-top: 1rem;
                  width: 100%;
                  border: none;
                "
                @click.stop="addToCart(car)"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Car Details Modal -->
    <div
      v-if="selectedCar"
      style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
      "
      @click.self="closeCarDetails"
    >
      <div
        style="
          max-width: 800px;
          width: 90%;
          background-color: white;
          border-radius: 0.5rem;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
          position: relative;
        "
      >
        <button
          style="
            position: absolute;
            top: 1rem;
            right: 1rem;
            background-color: transparent;
            color: #1a202c;
            font-size: 1.5rem;
            cursor: pointer;
            border: none;
          "
          @click="closeCarDetails"
        >
          &times;
        </button>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem">
          <div>
            <img
              :src="JSON.parse(selectedCar.pictures)[0]"
              :alt="selectedCar.brand + ' ' + selectedCar.title"
              style="width: 100%; height: auto; border-radius: 0.5rem"
            />
          </div>
          <div>
            <h2 style="font-size: 2rem; font-weight: bold; color: #1a202c; margin-bottom: 1rem">
              {{ selectedCar.brand }} {{ selectedCar.title }}
            </h2>
            <p style="font-size: 1.25rem; color: #718096; margin-bottom: 1.5rem">
              {{ selectedCar.description.slice(0, 100) + '...' }}
            </p>
            <div style="display: flex; align-items: center; margin-bottom: 1rem">
              <span style="font-weight: 500; margin-right: 1rem">Colors:</span>
              <div style="display: flex">
                <div
                  v-for="color in JSON.parse(selectedCar.colors)"
                  :key="color"
                  :style="{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    marginRight: '0.5rem',
                  }"
                ></div>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem">
              <span style="font-weight: 500">Year:</span>
              <span>{{ selectedCar.year }}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem">
              <span style="font-weight: 500">Price:</span>
              <span>NGN{{ formatPrice(selectedCar.price) }}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem">
              <span style="font-weight: 500">Customs Price:</span>
              <span>NGN{{ formatPrice(selectedCar.customs_price) }}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center">
              <span style="font-weight: 500">Available Quantity:</span>
              <span>{{ selectedCar.available_quantity }}</span>
            </div>
            <button
              style="
                background-color: #1a202c;
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 0.375rem;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
                transition: background-color 0.3s;
                cursor: pointer;
                font-size: 1.25rem;
                margin-top: 1.5rem;
                width: 100%;
                border: none;
              "
              @click="addToCart(selectedCar)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userGet } from '@/plugins/http'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import $ from 'jquery'
import 'slick-carousel'

export default {
  data() {
    return {
      searchQuery: '',
      isLoggedIn: this.getIsLoggedInFromLocalStorage(),
      cartItems: this.getCartItemsFromLocalStorage(),
      userRole: this.getUserRoleFromLocalStorage(),
      showCartDropdown: false,
      selectedCar: null,
      featuredCars: [],
      allCars: [],
    }
  },
  computed: {
    filteredCars() {
      if (this.searchQuery.trim() !== '') {
        const searchRegex = new RegExp(this.searchQuery, 'i')
        return this.allCars.filter((car) => {
          return searchRegex.test(car.brand) || searchRegex.test(car.title) || searchRegex.test(car.year.toString())
        })
      } else {
        return this.allCars
      }
    },
  },
  mounted() {
    this.fetchCarData()
    this.initHeroSlider()
  },

  methods: {
    searchCars() {
      // The search functionality is handled by the computed property
    },
    async fetchCarData() {
      try {
        // Fetch featured cars
        const featuredCarsResponse = await userGet('/featured-cars')
        this.featuredCars = featuredCarsResponse.data.featured_cars

        // Fetch all cars
        const allCarsResponse = await userGet('/cars')
        this.allCars = allCarsResponse.data.cars
      } catch (error) {
        console.error('Error fetching car data:', error)
      }
    },
    // ...
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    initHeroSlider() {
      $('.hero-slider').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: true,
        fade: true,
        cssEase: 'linear',
      })
    },

    getUserRoleFromLocalStorage() {
      return localStorage.getItem('userRole')
    },
    setUserRoleInLocalStorage(role) {
      localStorage.setItem('userRole', role)
    },
    logout() {
      // Perform logout logic
      this.setIsLoggedInInLocalStorage(false)
      this.clearCartFromLocalStorage()
      // Remove the specified items from localStorage
      localStorage.removeItem('accessToken')
      localStorage.removeItem('adminData')
      localStorage.removeItem('buyerData')
      localStorage.removeItem('role')
      localStorage.removeItem('isLoggedIn')

      // Reload the page
      window.location.reload()
    },
    getIsLoggedInFromLocalStorage() {
      return JSON.parse(localStorage.getItem('isLoggedIn')) || false
    },
    setIsLoggedInInLocalStorage(value) {
      localStorage.setItem('isLoggedIn', JSON.stringify(value))
    },
    addToCart(car) {
      this.cartItems.push(car)
      this.saveCartItemsToLocalStorage()
      toast.success('Car added to cart')
    },
    removeFromCart(car) {
      this.cartItems = this.cartItems.filter((item) => item.id !== car.id)
      this.saveCartItemsToLocalStorage()
      console.log('Removed from cart:', car)
    },
    showCarDetails(car) {
      this.selectedCar = car
    },
    closeCarDetails() {
      this.selectedCar = null
    },
    getCartItemsFromLocalStorage() {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
      return cartItems
    },
    saveCartItemsToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },
    clearCartFromLocalStorage() {
      localStorage.removeItem('cartItems')
    },
    toggleCartDropdown() {
      this.showCartDropdown = !this.showCartDropdown
    },
    scrollToAllCars() {
      const allCarsSection = this.$el.querySelector('#all-cars-section')
      if (allCarsSection) {
        allCarsSection.scrollIntoView({ behavior: 'smooth' })
      }
    },
    async mounted() {
      this.isLoggedIn = this.getIsLoggedInFromLocalStorage()
    },
    getRandomIndexes(totalLength, count) {
      const indexes = []
      while (indexes.length < count) {
        const randomIndex = Math.floor(Math.random() * totalLength)
        if (!indexes.includes(randomIndex)) {
          indexes.push(randomIndex)
        }
      }
      return indexes
    },
  },
}
</script>
