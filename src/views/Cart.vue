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
          <router-link
            to="/"
            style="color: #1a202c; transition: color 0.3s; margin-left: 1.5rem; text-decoration: none; font-weight: 500"
            >Home</router-link
          >
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section
      style="
        position: relative;
        height: 400px;
        overflow: hidden;
        background-image: url('https://hips.hearstapps.com/hmg-prod/images/2024-hyundai-sonata-n-line-101-64ef8c4d94261.jpg');
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 4rem;
      "
    >
      <div style="text-align: center; color: white; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)">
        <h1 style="font-size: 4rem; font-weight: bold; margin-bottom: 1rem">Your Cart</h1>
        <p style="font-size: 1.5rem">Review your selected cars and proceed to checkout</p>
      </div>
    </section>

    <!-- Cart Items -->
    <div style="max-width: 1280px; margin: 0 auto; padding: 4rem 2rem">
      <div v-if="cartItems.length === 0" style="text-align: center; color: #718096; font-size: 1.5rem">
        Your cart is empty.
      </div>
      <div v-else>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem">
          <div
            v-for="item in cartItems"
            :key="item.id"
            style="
              background-color: white;
              border-radius: 0.5rem;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
              overflow: hidden;
            "
          >
            <div style="position: relative">
              <img
                :src="JSON.parse(item.pictures)[0]"
                :alt="item.brand + ' ' + item.title"
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
                NGN{{ formatPrice(item.price) }}
              </div>
            </div>
            <div style="padding: 1.5rem">
              <h3 style="font-size: 1.25rem; font-weight: bold; color: #1a202c; margin-bottom: 0.5rem">
                {{ item.brand }} {{ item.title }}
              </h3>
              <p style="color: #718096; margin-bottom: 1rem">{{ item.description.slice(0, 100) + '...' }}</p>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem">
                <span style="font-weight: 500">Color:</span>
                <select v-model="selectedColors[item.id]">
                  <option value="" disabled>Select Color</option>
                  <option v-for="color in JSON.parse(item.colors)" :value="color" :key="color">{{ color }}</option>
                </select>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center">
                <span style="font-weight: 500">Year:</span>
                <span>{{ item.year }}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem">
                <span style="font-weight: 500">Customs Price:</span>
                <span>NGN{{ formatPrice(item.customs_price) }}</span>
              </div>
              <button
                style="
                  background-color: #e53e3e;
                  color: white;
                  padding: 0.5rem 1rem;
                  border-radius: 0.375rem;
                  transition: background-color 0.3s;
                  cursor: pointer;
                  font-size: 1rem;
                  margin-top: 1rem;
                  width: 100%;
                  border: none;
                "
                @click="removeFromCart(item)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <!-- Shipping Location -->
        <div v-if="shippingLocations.length" class="shipping-section">
          <h2 class="shipping-section-title">Shipping Location</h2>
          <div class="shipping-section-input">
            <select v-model="selectedShippingLocationId" @change="fetchShippingMethods">
              <option value="" disabled selected>Select Shipping Location</option>
              <option v-for="location in shippingLocations" :value="location.id" :key="location.id">
                {{ location.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Shipping Method -->
        <div v-if="shippingMethods.length" class="shipping-section">
          <h2 class="shipping-section-title">Shipping Method</h2>
          <div class="shipping-section-input">
            <select v-model="selectedShippingMethod">
              <option value="" disabled selected>Select Shipping Method</option>
              <option v-for="method in shippingMethods" :value="method" :key="method.id">
                {{ method.name }} - NGN{{ formatPrice(method.price) }}
              </option>
            </select>
          </div>
        </div>

        <!-- Cart Summary -->
        <div style="margin-top: 4rem">
          <h2 style="font-size: 2rem; font-weight: bold; color: #1a202c; margin-bottom: 1.5rem">Cart Summary</h2>
          <div
            style="
              padding: 1.5rem;
              background-color: white;
              border-radius: 0.5rem;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
            "
          >
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem">
              <span style="font-size: 1.25rem; font-weight: 500; color: #1a202c">Subtotal:</span>
              <span style="font-size: 1.25rem; color: #1a202c">NGN{{ formatPrice(cartSubtotal) }}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem">
              <span style="font-size: 1.25rem; font-weight: 500; color: #1a202c">Custom Price:</span>
              <span style="font-size: 1.25rem; color: #1a202c">NGN{{ formatPrice(customPrice) }}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem">
              <span style="font-size: 1.25rem; font-weight: 500; color: #1a202c">Shipping Fee:</span>
              <span style="font-size: 1.25rem; color: #1a202c">NGN{{ formatPrice(shippingFeeDisplay) }}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center">
              <span style="font-size: 1.5rem; font-weight: bold; color: #1a202c">Total:</span>
              <span style="font-size: 1.5rem; font-weight: bold; color: #1a202c">NGN{{ formatPrice(cartTotal) }}</span>
            </div>
          </div>
        </div>

        <!-- Proceed to Checkout button -->
        <div style="display: flex; justify-content: flex-end; margin-top: 4rem">
          <button
            style="
              background-color: #1a202c;
              color: white;
              padding: 1rem 2rem;
              border-radius: 0.375rem;
              transition: background-color 0.3s;
              cursor: pointer;
              font-size: 1.25rem;
              border: none;
            "
            @click="initializePayment"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import PaystackPop from '@paystack/inline-js'
import { userGet, userPost } from '@/plugins/http'

export default {
  data() {
    return {
      cartItems: [],
      shippingLocations: [],
      selectedShippingLocationId: '',
      shippingMethods: [],
      selectedShippingMethod: '',
      shippingFeeDisplay: '0.00',
      selectedColors: {}, // New data property to store selected colors
    }
  },
  computed: {
    cartSubtotal() {
      return this.cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)
    },
    customPrice() {
      return this.cartItems.reduce((total, item) => total + parseFloat(item.customs_price), 0).toFixed(2)
    },
    shippingFee() {
      if (this.selectedShippingLocationId && this.selectedShippingMethod) {
        this.fetchShippingPrice()
      }
      return this.shippingFeeDisplay
    },
    cartTotal() {
      return (parseFloat(this.cartSubtotal) + parseFloat(this.customPrice) + parseFloat(this.shippingFee)).toFixed(2)
    },
    availableShippingMethods() {
      if (this.selectedShippingLocation) {
        return this.shippingMethods[this.selectedShippingLocation]
      }
      return []
    },
  },
  created() {
    this.cartItems = this.getCartItemsFromLocalStorage()
    this.fetchShippingLocations()
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    async fetchShippingPrice() {
      try {
        const response = await userPost('/shipping-price', {
          location_id: this.selectedShippingLocationId,
          method_name: this.selectedShippingMethod.name,
        })
        if (response.data.success) {
          const shippingPrice = parseFloat(response.data.shipping_price)
          const numberOfCars = this.cartItems.length
          this.shippingFeeDisplay = (shippingPrice * numberOfCars).toFixed(2)
        } else {
          console.error('Error fetching shipping price:', response.data.message)
          this.shippingFeeDisplay = '0.00'
        }
      } catch (error) {
        console.error('Error fetching shipping price:', error)
        this.shippingFeeDisplay = '0.00'
      }
    },
    async fetchShippingLocations() {
      try {
        const response = await userGet('/shipping-locations')
        if (Array.isArray(response.data.shipping_locations)) {
          this.shippingLocations = response.data.shipping_locations
        } else {
          console.error('Invalid shipping locations response:', response.data)
        }
      } catch (error) {
        console.error('Error fetching shipping locations:', error)
      }
    },
    async fetchShippingMethods() {
      try {
        const response = await userGet(`/shipping-methods/${this.selectedShippingLocationId}`)
        this.shippingMethods = response.data.shipping_methods
      } catch (error) {
        console.error('Error fetching shipping methods:', error)
      }
    },
    async initializePayment() {
      // Validate selected shipping location and shipping method
      if (!this.selectedShippingLocationId || !this.selectedShippingMethod) {
        toast.error('Please select shipping location and shipping method')
        return
      }

      // Validate selected colors for cart items
      const missingColorItems = this.cartItems.filter((item) => !this.selectedColors[item.id])
      if (missingColorItems.length > 0) {
        toast.error('Please select a color for each car in your cart')
        return
      }

      // Retrieve the buyerData from local storage
      const buyerData = JSON.parse(localStorage.getItem('buyerData'))

      if (!buyerData) {
        toast.error('Buyer data not found in local storage')
        return
      }

      const handler = PaystackPop.setup({
        key: 'pk_test_6522b958d6007bfc9e3f999f3b36c82a1fc31726',
        email: buyerData.email,
        amount: this.cartTotal * 100,
        currency: 'NGN',
        ref: `${Math.floor(Math.random() * 1000000000)}`,
        metadata: {
          customer_id: buyerData.id,
          customer_name: buyerData.name,
          customer_phone: buyerData.phone,
          customer_address: buyerData.address,
        },
        callback: async (response) => {
          // Handle successful payment
          console.log(response)
          toast.success('Payment successful')

          // Prepare the data to be sent to the backend
          const orderData = {
            customer_id: buyerData.id,
            payment_ref: response.reference,
            cars: this.cartItems.map((item) => ({
              id: item.id,
              price: item.price,
              color: this.selectedColors[item.id], // Include the selected color
            })),
            shipping_location_id: this.selectedShippingLocationId,
            shipping_method_id: this.selectedShippingMethod.id,
            total_order: this.cartTotal,
          }

          try {
            // Send the order data to the backend
            const response = await userPost('/orders', orderData)

            if (response.data.success) {
              // Clear the cart and redirect to a success page or perform any other necessary actions
              this.clearCartFromLocalStorage()
              this.$router.push({ name: 'home' })
            } else {
              console.error('Error creating order:', response.data.message)
              toast.error('Error creating order. Please try again.')
            }
          } catch (error) {
            console.error('Error creating order:', error)
            toast.error('Error creating order. Please try again.')
          }
        },
        onClose: () => {
          // Handle payment cancellation
          toast.info('Payment cancelled')
        },
      })

      handler.openIframe()
    },
    getCartItemsFromLocalStorage() {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
      return cartItems
    },
    removeFromCart(item) {
      this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== item.id)
      this.saveCartItemsToLocalStorage()
    },
    saveCartItemsToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },
    clearCartFromLocalStorage() {
      localStorage.removeItem('cartItems')
    },
    onShippingLocationChange() {
      this.selectedShippingMethod = ''
    },
  },
}
</script>

<style scoped>
.shipping-section {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.shipping-section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.shipping-section-input {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 45%;
}

.shipping-section-input select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: white;
  color: #4a5568;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234a5568'%3E%3Cpath d='M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5rem;
  padding-right: 2.5rem;
}
</style>
