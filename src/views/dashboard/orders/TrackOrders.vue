<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-4">Track Orders</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">Order ID</th>
              <th class="px-4 py-2">Order Item</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id" :class="{ 'bg-gray-100': order.id === selectedOrder?.id }">
              <td class="border px-4 py-2">{{ order.id }}</td>
              <td class="border px-4 py-2">{{ order.car_name }}</td>
              <td class="border px-4 py-2">{{ order.status }}</td>
              <td class="border px-4 py-2">
                <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="selectOrder(order)">Track</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div id="map" style="height: 400px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { userGet } from '@/plugins/http'

export default {
  data() {
    return {
      orders: [],
      selectedOrder: null,
      map: null,
    }
  },
  mounted() {
    this.fetchOrders()
    this.initializeMap()
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await userGet('/orders')
        this.orders = response.data.orders.map((order) => ({
          ...order,
          coordinates: this.generateCoordinates(order.status),
        }))
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    },
    generateCoordinates(status) {
      const usaCoordinates = [37.0902, -95.7129]
      const nigeriaCoordinates = [9.082, 8.6753]

      const pendingCoordinates = this.randomizeCoordinates(usaCoordinates)
      const processingCoordinates = this.randomizeCoordinates(usaCoordinates)
      const shippedCoordinates = this.randomizeCoordinates(nigeriaCoordinates)
      const deliveredCoordinates = this.randomizeCoordinates(nigeriaCoordinates)
      const canceledCoordinates = this.randomizeCoordinates(usaCoordinates)

      switch (status) {
        case 'Pending':
          return [pendingCoordinates]
        case 'Processing':
          return [pendingCoordinates, processingCoordinates]
        case 'Shipped':
          return [pendingCoordinates, processingCoordinates, shippedCoordinates]
        case 'Delivered':
          return [pendingCoordinates, processingCoordinates, shippedCoordinates, deliveredCoordinates]
        case 'Cancelled':
          return [pendingCoordinates, canceledCoordinates]
        default:
          return []
      }
    },
    randomizeCoordinates(coordinates) {
      const [lat, lng] = coordinates
      const offsetLat = Math.random() * 10 - 5
      const offsetLng = Math.random() * 10 - 5
      return [lat + offsetLat, lng + offsetLng]
    },
    initializeMap() {
      this.map = L.map('map').setView([0, 0], 2)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(this.map)
    },
    selectOrder(order) {
      this.selectedOrder = order
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
          this.map.removeLayer(layer)
        }
      })

      const coordinates = order.coordinates
      coordinates.forEach((coord, index) => {
        const marker = L.marker(coord).addTo(this.map)

        let locationName = ''
        if (index === 0) {
          locationName = 'Pending'
        } else if (index === coordinates.length - 1) {
          locationName = order.status
        }

        if (locationName) {
          marker.bindPopup(locationName).openPopup()
        }

        if (index > 0) {
          const prevCoord = coordinates[index - 1]
          const polyline = L.polyline([prevCoord, coord], { color: 'blue' }).addTo(this.map)
        }
      })

      this.map.fitBounds(L.polyline(coordinates).getBounds())
    },
  },
}
</script>
