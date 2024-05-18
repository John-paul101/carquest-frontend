<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-between px-4 mt-4 sm:px-8">
    <h2 class="text-2xl text-gray-600">Dashboard</h2>

    <div class="flex items-center space-x-1 text-xs">
      <a href="#" class="font-bold text-indigo-700">Home</a>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="text-gray-600">Dashboard</span>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
      <div class="p-4 bg-green-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </div>
      <div class="px-4 text-gray-700">
        <h3 class="text-sm tracking-wider">Total Cars</h3>
        <p class="text-3xl">{{ totalCars.toLocaleString() }}</p>
      </div>
    </div>

    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
      <div class="p-4 bg-blue-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
          />
        </svg>
      </div>
      <div class="px-4 text-gray-700">
        <h3 class="text-sm tracking-wider">Total Orders</h3>
        <p class="text-3xl">{{ totalOrders.toLocaleString() }}</p>
      </div>
    </div>

    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
      <div class="p-4 bg-indigo-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          />
        </svg>
      </div>
      <div class="px-4 text-gray-700">
        <h3 class="text-sm tracking-wider">Total Amount Processed</h3>
        <p class="text-lg">NGN{{ formattedTotalTransactions }}</p>
      </div>
    </div>

    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
      <div class="p-4 bg-red-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      </div>
      <div class="px-4 text-gray-700">
        <h3 class="text-sm tracking-wider">Total Buyers</h3>
        <p class="text-3xl">{{ totalBuyers.toLocaleString() }}</p>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-5 sm:px-8">
    <div class="bg-white border rounded-lg shadow sm:col-span-2">
      <div class="flex justify-between items-center px-4 py-2 mb-2 border-b-2 text-gray-600">
        <h3 class="tracking-wider">Buyers</h3>
      </div>

      <div class="px-4 py-2">
        <table class="min-w-full text-gray-500">
          <tbody>
            <tr v-for="buyer in buyers" :key="buyer.id">
              <td class="flex items-center py-2">
                <div
                  class="inline-block h-12 w-12 rounded-full ring-2 ring-white bg-blue-500 flex items-center justify-center text-white font-bold text-xl"
                >
                  {{ buyer.name.charAt(0).toUpperCase() }}
                </div>
                <div class="px-4">
                  <div>{{ buyer.name }}</div>
                  <div class="font-bold text-sm">
                    <a href="#">{{ buyer.email }}</a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="bg-white border rounded-lg shadow sm:col-span-3">
      <div class="flex justify-between items-center px-4 py-2 mb-2 border-b-2 text-gray-600">
        <h3 class="tracking-wider">Recent Orders</h3>
      </div>
      <div class="px-4">
        <table class="table-fixed min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>

              <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>

              <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>

              <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Buyer Name
              </th>

              <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Reference
              </th>
              <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Update Order
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 text-sm text-gray-500">
            <tr v-for="order in recentOrders" :key="order.id">
              <td class="py-4 whitespace-nowrap">{{ order.id }}</td>
              <td class="py-4 whitespace-nowrap text-sm text-gray-500">{{ order.car_name }}</td>
              <td class="py-4 whitespace-nowrap text-sm text-gray-500">NGN{{ order.total_amount.toLocaleString() }}</td>
              <td class="py-4 whitespace-nowrap text-sm text-gray-500">{{ order.buyer_name }}</td>
              <td class="py-4 whitespace-nowrap text-sm text-gray-500">{{ order.payment_reference }}</td>
              <td class="py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  class="px-2 py-1 rounded text-xs text-white"
                  :class="{
                    'bg-yellow-500': order.status === 'Pending',
                    'bg-blue-500': order.status === 'Processing',
                    'bg-purple-500': order.status === 'Shipped',
                    'bg-green-500': order.status === 'Delivered',
                    'bg-red-500': order.status === 'Cancelled',
                  }"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="py-4 whitespace-nowrap">
                <div class="relative inline-block">
                  <button
                    class="px-2 py-1 rounded text-xs text-white bg-indigo-500 hover:bg-indigo-600"
                    @click="showDropdown[order.id] = !showDropdown[order.id]"
                  >
                    Change Status
                  </button>
                  <div
                    v-show="showDropdown[order.id]"
                    class="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg"
                  >
                    <div class="py-1">
                      <button
                        v-for="status in orderStatuses"
                        :key="status"
                        class="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                        @click="changeOrderStatus(order, status)"
                      >
                        {{ status }}
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { userGet, userPatch } from '@/plugins/http'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
export default {
  data() {
    return {
      totalCars: 0,
      totalOrders: 0,
      totalTransactions: 0,
      totalBuyers: 0,
      buyers: [],
      recentOrders: [],
      showDropdown: {},
      orderStatuses: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    }
  },
  computed: {
    formattedTotalTransactions() {
      const floatValue = Number.parseFloat(this.totalTransactions)
      return floatValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
  },
  mounted() {
    this.fetchData()
    this.fetchBuyerData()
    this.fetchRecentOrders()
  },
  methods: {
    async changeOrderStatus(order, newStatus) {
      try {
        const response = await userPatch(`/orders/${order.id}/status`, {
          status: newStatus,
        })
        if (response.status === 200) {
          await this.fetchRecentOrders()
          toast.success('Order status updated successfully')
        } else {
          toast.error('Error updating order status')
        }
        this.showDropdown[order.id] = false
      } catch (error) {
        console.error('Error updating order status:', error)
      }
    },
    async fetchData() {
      try {
        const response = await userGet('/admin-dashboard')
        const data = response.data.data

        this.totalCars = data.total_cars
        this.totalOrders = data.total_orders
        this.totalTransactions = data.total_transactions
        this.totalBuyers = data.total_buyers
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async fetchBuyerData() {
      try {
        const buyersResponse = await userGet('/admin-view-buyers')
        console.log('Buyers Response:', buyersResponse)
        this.buyers = buyersResponse.data.buyers
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async fetchRecentOrders() {
      try {
        const ordersResponse = await userGet('/admin-view-orders')
        console.log('Orders Response:', ordersResponse)
        this.recentOrders = ordersResponse.data.orders
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
  },
}
</script>
