import type { CreateProductDto, Product } from '@/types/product'

import apiClient from '@/api/client'

export const productsApi = {
  async getAll(): Promise<Product[]> {
    const { data } = await apiClient.get<Product[]>('/products')
    return data
  },

  async create(product: CreateProductDto): Promise<Product> {
    const { data } = await apiClient.post<Product>('/products', product)
    return data
  },
}
