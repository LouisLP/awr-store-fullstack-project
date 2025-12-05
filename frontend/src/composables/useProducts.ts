import { ref } from 'vue'

import type { CreateProductDto, Product, UpdateProductDto } from '@/types/product'

import { productsApi } from '@/api/products'

export function useProducts() {
  const products = ref<Product[]>([])
  const product = ref<Product | null>(null)
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

  async function fetchProduct(id: number) {
    loading.value = true
    error.value = null
    try {
      product.value = await productsApi.getById(id)
    }
    catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to load product'
      console.error('Error fetching product:', e)
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

  async function updateProduct(id: number, productData: UpdateProductDto) {
    loading.value = true
    error.value = null
    try {
      const updatedProduct = await productsApi.update(id, productData)
      const index = products.value.findIndex(p => p.id === id)
      if (index > -1) {
        products.value[index] = updatedProduct
      }
      return updatedProduct
    }
    catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to update product'
      console.error('Error updating product:', e)
      throw e
    }
    finally {
      loading.value = false
    }
  }

  async function deleteProduct(id: number) {
    loading.value = true
    error.value = null
    try {
      await productsApi.delete(id)
      products.value = products.value.filter(p => p.id !== id)
    }
    catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to delete product'
      console.error('Error deleting product:', e)
      throw e
    }
    finally {
      loading.value = false
    }
  }

  return {
    products,
    product,
    loading,
    error,
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
