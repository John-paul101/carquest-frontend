<template>
  <div class="flex min-h-screen">
    <the-sidebar />

    <div class="flex flex-col flex-grow bg-gray-200">
      <the-header />

      <div class="mb-auto">
        <router-view />
      </div>

      <the-footer />
    </div>
  </div>
</template>

<script>
import TheSidebar from '@/components/layouts/BuyerTheSidebar.vue'
import TheHeader from '@/components/layouts/BuyerTheHeader.vue'
import TheFooter from '@/components/layouts/BuyerTheFooter.vue'

export default {
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
  },
}
</script>
