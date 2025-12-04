import { createMemoryHistory, createRouter } from 'vue-router'

import AdminDashboard from '@/views/AdminDashboard.vue'
import CreateProductView from '@/views/CreateProductView.vue'
// import OrderConfirmationView from '@/views/OrderConfirmationView.vue'
import ShopView from '@/views/ShopView.vue'

const router = createRouter({
  history: createMemoryHistory(),
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
    // {
    //   path: '/orders/:id',
    //   name: 'order-confirmation',
    //   component: OrderConfirmationView,
    // },
  ],
})

export default router
