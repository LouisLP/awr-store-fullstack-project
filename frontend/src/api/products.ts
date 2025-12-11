import type { CreateProductDto, Product, UpdateProductDto } from '@/types/product'

import apiClient from './client'

export const productsApi = {
  async getAll(): Promise<Product[]> {
    const { data } = await apiClient.get<Product[]>('/products')
    return data
  },

  async getById(id: number): Promise<Product> {
    const { data } = await apiClient.get<Product>(`/products/${id}`)
    return data
  },

  async create(product: CreateProductDto): Promise<Product> {
    const { data } = await apiClient.post<Product>('/products', product)
    return data
  },

  async update(id: number, product: UpdateProductDto): Promise<Product> {
    const { data } = await apiClient.patch<Product>(`/products/${id}`, product)
    return data
  },

  async delete(id: number): Promise<{ success: boolean, message: string }> {
    const { data } = await apiClient.delete(`/products/${id}`)
    return data
  },
}
