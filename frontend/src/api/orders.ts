import type { CreateOrderDto, OrderResponse } from '@/types/order'

import apiClient from './client'

export const ordersApi = {
  async create(order: CreateOrderDto): Promise<OrderResponse> {
    const { data } = await apiClient.post<OrderResponse>('/orders', order)
    return data
  },

  async getById(id: string): Promise<OrderResponse> {
    const { data } = await apiClient.get<OrderResponse>(`/orders/${id}`)
    return data
  },
}
