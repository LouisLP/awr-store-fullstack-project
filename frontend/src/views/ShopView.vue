<script setup lang="ts">
import { onMounted } from 'vue'

import ProductCard from '@/components/products/ProductCard.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { useProducts } from '@/composables/useProducts'

const { products, loading, error, fetchProducts } = useProducts()

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="mt-12">
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-8">
        Browse Products
      </h1>

      <!-- Loading State -->
      <LoadingSpinner v-if="loading" />

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-error">
        <span>{{ error }}</span>
        <button class="btn btn-sm" @click="fetchProducts">
          Retry
        </button>
      </div>

      <!-- Products Grid -->
      <div v-else-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="console.log('Add to cart:', product.id)"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="alert alert-info">
        <span>No products available yet.</span>
      </div>
    </div>
  </div>
</template>
