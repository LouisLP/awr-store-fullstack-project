import { ref } from 'vue'

import type { CreateProductDto, Product } from '@/types/product'

import { productsApi } from '@/api/products'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      products.value = await productsApi.getAll()
    }
    catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to load products'
      console.error('Error fetching products:', e)
    }
    finally {
      loading.value = false
    }
  }

  async function createProduct(productData: CreateProductDto) {
    loading.value = true
    error.value = null
    try {
      const newProduct = await productsApi.create(productData)
      products.value.unshift(newProduct)
      return newProduct
    }
    catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to create product'
      console.error('Error creating product:', e)
      throw e
    }
    finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
  }
}
