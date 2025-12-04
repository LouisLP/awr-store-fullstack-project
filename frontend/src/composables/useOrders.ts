import { ref } from 'vue'

import type { CreateOrderDto, OrderResponse } from '@/types/order'

import { ordersApi } from '@/api/orders'

export function useOrders() {
  const order = ref<OrderResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function createOrder(orderData: CreateOrderDto) {
    loading.value = true
    error.value = null
    try {
      const newOrder = await ordersApi.create(orderData)
      order.value = newOrder
      return newOrder
    }
    catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to create order'
      console.error('Error creating order:', e)
      throw e
    }
    finally {
      loading.value = false
    }
  }

  async function fetchOrder(id: string) {
    loading.value = true
    error.value = null
    try {
      order.value = await ordersApi.getById(id)
    }
    catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to load order'
      console.error('Error fetching order:', e)
    }
    finally {
      loading.value = false
    }
  }

  return {
    order,
    loading,
    error,
    createOrder,
    fetchOrder,
  }
}
