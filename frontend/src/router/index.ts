import { createRouter, createWebHistory } from 'vue-router'

import AdminDashboard from '@/views/AdminDashboard.vue'
import CartView from '@/views/CartView.vue'
import CreateProductView from '@/views/CreateProductView.vue'
import OrderConfirmationView from '@/views/OrderConfirmationView.vue'
import ShopView from '@/views/ShopView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard,
    },
    {
      path: '/admin/new',
      name: 'create-product',
      component: CreateProductView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/orders/:id',
      name: 'order-confirmation',
      component: OrderConfirmationView,
    },
  ],
})

export default router
