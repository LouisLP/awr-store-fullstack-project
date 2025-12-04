<script setup lang="ts">
import type { Product } from '@/types/product'

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td class="font-semibold">
            {{ product.name }}
          </td>
          <td class="max-w-md truncate">
            {{ product.description }}
          </td>
          <td class="font-bold text-primary">
            €{{ product.price.toFixed(2) }}
          </td>
          <td>
            <span
              class="badge"
              :class="product.availableCount > 0 ? 'badge-success' : 'badge-error'"
            >
              {{ product.availableCount }}
            </span>
          </td>
          <td class="text-sm text-base-content/60">
            {{ new Date(product.createdAt).toLocaleDateString() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
