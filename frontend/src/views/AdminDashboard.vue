<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted } from 'vue'

import type { Product } from '@/types/product'

import ProductTable from '@/components/products/ProductTable.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { useProducts } from '@/composables/useProducts'

const { products, loading, error, fetchProducts, deleteProduct } = useProducts()

onMounted(() => {
  fetchProducts()
})

async function handleDelete(id: number) {
  try {
    await deleteProduct(id)
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {
    // Error handled in the composable
  }
}

function handleEdit(product: Product) {
  // TODO: make a modal or route for editing
  // eslint-disable-next-line no-console
  console.info('Edit product', product)
}
</script>

<template>
  <div class="container mx-auto mt-12 px-4 py-8">
    <div class="mb-8 flex items-center justify-between">
      <h1 class="text-4xl font-bold">
        Admin Dashboard
      </h1>
      <RouterLink
        to="/admin/new"
        class="btn btn-neutral btn-lg"
      >
        <Icon icon="mdi:plus" class="size-6" />
        Create New Product
      </RouterLink>
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
        <ProductTable
          :products="products"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="alert alert-info">
      <span>No products yet. Create your first here, or run the seed script!</span>
    </div>
  </div>
</template>
