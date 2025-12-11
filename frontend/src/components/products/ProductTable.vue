<script setup lang="ts">
import { Icon } from '@iconify/vue'

import type { Product } from '@/types/product'

defineProps<{
  products: Product[]
}>()

const emit = defineEmits<{
  edit: [product: Product]
  delete: [id: number]
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table-zebra table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Created</th>
          <th>Actions</th>
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
          <td class="text-primary font-bold">
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
          <td class="text-base-content/60 text-sm">
            {{ new Date(product.createdAt).toLocaleDateString() }}
          </td>
          <td>
            <div class="flex">
              <button
                class="btn btn-ghost btn-sm"
                @click="emit('edit', product)"
              >
                <Icon icon="mdi:pencil" class="size-4" />
              </button>
              <button
                class="btn btn-ghost btn-sm text-error"
                @click="emit('delete', product.id)"
              >
                <Icon icon="mdi:delete" class="size-4" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
