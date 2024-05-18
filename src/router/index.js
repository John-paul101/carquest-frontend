import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated, getUserRole } from '@/router/auth'

const routes = [
  {
    path: '/admin',
    component: () => import('@/views/AdminDashboard.vue'),
    meta: { requiresAuth: true, roles: ['admin'], title: 'Admin Dashboard' },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('@/views/dashboard/Home.vue'),
        meta: { requiresAuth: true, roles: ['admin'], title: 'Admin Home' },
      },
      {
        path: 'users',
        name: 'user-list',
        component: () => import('@/views/dashboard/users/UserList.vue'),
        meta: { requiresAuth: true, roles: ['admin'], title: 'User List' },
      },
      {
        path: 'cars',
        name: 'cars-list',
        component: () => import('@/views/dashboard/cars/CarsList.vue'),
        meta: { requiresAuth: true, roles: ['admin'], title: 'Cars List' },
      },
      {
        path: 'shipping-locations',
        name: 'shipping-locations',
        component: () => import('@/views/dashboard/shipping/ShippingLocations.vue'),
        meta: { requiresAuth: true, roles: ['admin'], title: 'Shipping Locations' },
      },
      {
        path: 'orders',
        name: 'admin-orders',
        component: () => import('@/views/dashboard/orders/AdminOrders.vue'),
        meta: { requiresAuth: true, roles: ['admin'], title: 'Admin Orders' },
      },
    ],
  },
  {
    path: '/buyer',
    component: () => import('@/views/BuyerDashboard.vue'),
    meta: { requiresAuth: true, roles: ['buyer'], title: 'Buyer Dashboard' },
    children: [
      {
        path: '',
        name: 'buyer-dashboard',
        component: () => import('@/views/dashboard/BuyerHome.vue'),
        meta: { requiresAuth: true, roles: ['buyer'], title: 'Buyer Home' },
      },
      {
        path: 'orders',
        name: 'buyer-orders',
        component: () => import('@/views/dashboard/orders/BuyerOrders.vue'),
        meta: { requiresAuth: true, roles: ['buyer'], title: 'Buyer Orders' },
      },
    ],
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('@/views/admin/Login.vue'),
    meta: { guestOnly: true, title: 'Admin Login' },
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: { title: 'Homepage' },
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart.vue'),
    meta: { requiresAuth: true, roles: ['buyer'], title: 'Cart' },
  },
  {
    path: '/cars/:id',
    name: 'CarDetails',
    component: () => import('@/views/CarDetails.vue'),
    meta: { title: 'Car Details' },
  },
  {
    path: '/login',
    name: 'buyer-login',
    component: () => import('@/views/buyer/Login.vue'),
    meta: { guestOnly: true, title: 'Buyer Login' },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/buyer/Register.vue'),
    meta: { guestOnly: true, title: 'Register' },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    meta: { requiresAuth: true, roles: ['buyer'], title: 'Profile' },
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/Checkout.vue'),
    meta: { requiresAuth: true, roles: ['buyer'], title: 'Checkout' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default Title'

  // Check if the route is marked as guest only
  if (to.matched.some((record) => record.meta.guestOnly)) {
    if (isAuthenticated()) {
      // If the user is authenticated and trying to access a guest-only route, redirect to the appropriate dashboard
      const userRole = getUserRole()
      if (userRole === 'admin') {
        next({ name: 'admin-dashboard' })
      } else if (userRole === 'buyer') {
        next({ name: 'buyer-dashboard' })
      }
    } else {
      // If the user is not authenticated, allow access to the guest-only route
      next()
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the route requires authentication
    if (!isAuthenticated()) {
      // If the user is not authenticated, redirect to the appropriate login page
      if (to.matched.some((record) => record.meta.roles.includes('admin'))) {
        next({ name: 'admin-login' })
      } else if (to.matched.some((record) => record.meta.roles.includes('buyer'))) {
        next({ name: 'buyer-login' })
      }
    } else {
      // If the user is authenticated, check their role
      const userRole = getUserRole()
      if (to.meta.roles && !to.meta.roles.includes(userRole)) {
        // If the user's role is not authorized for the route, redirect to the appropriate dashboard
        if (userRole === 'admin') {
          next({ name: 'admin-dashboard' })
        } else if (userRole === 'buyer') {
          next({ name: 'buyer-dashboard' })
        }
      } else {
        // If the user's role is authorized or no specific roles are required, allow access
        next()
      }
    }
  } else {
    // If the route doesn't require authentication or is not guest-only, allow access
    next()
  }
})

export default router
