<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import ProductTable from '@/components/products/ProductTable.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { useProducts } from '@/composables/useProducts'

const router = useRouter()
const { products, loading, error, fetchProducts } = useProducts()

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">
        Product Management
      </h1>
      <button
        class="btn btn-neutral btn-lg"
        @click="router.push('/admin/new')"
      >
        <Icon icon="mdi:plus" class="size-6" />
        Create New Product
      </button>
    </div>

    <!-- Loading State -->
    <LoadingSpinner v-if="loading" />

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-error">
      <span>{{ error }}</span>
      <button class="btn btn-sm" @click="fetchProducts">
        Retry
      </button>
    </div>

    <!-- Products Table -->
    <div v-else-if="products.length > 0" class="card bg-base-100 shadow-xl">
      <div class="card-body p-0">
        <ProductTable :products="products" />
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="alert alert-info">
      <span>No products yet. Create your first here, or run the seed script!</span>
    </div>
  </div>
</template>
