<script setup lang="ts">
import { Icon } from '@iconify/vue'

import type { Product } from '@/types/product'

defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  addToCart: []
}>()
</script>

<template>
  <div class="card bg-black/30 shadow-xl hover:shadow-2xl hover:ring-2 ring-secondary transition-all">
    <div class="card-body">
      <h2 class="card-title">
        {{ product.name }}
      </h2>
      <p class="text-sm text-base-content/70 line-clamp-2">
        {{ product.description }}
      </p>

      <div class="flex justify-between items-center mt-4">
        <div>
          <div class="text-2xl font-bold text-primary">
            €{{ product.price.toFixed(2) }}
          </div>
          <div class="text-xs text-base-content/60">
            <span
              class="badge"
              :class="product.availableCount > 0 ? 'badge-secondary' : 'badge-error'"
            >
              {{ product.availableCount }} in stock
            </span>
          </div>
        </div>
      </div>

      <div class="card-actions justify-end mt-4">
        <button
          class="btn btn-neutral w-full"
          :disabled="product.availableCount === 0"
          @click="emit('addToCart')"
        >
          <Icon v-if="product.availableCount > 0" icon="mdi:plus" class="size-4 text-white" />
          <Icon v-else icon="mdi:close" class="size-4 text-white" />
          {{ product.availableCount > 0 ? 'Add to Cart' : 'Out of Stock' }}
        </button>
      </div>
    </div>
  </div>
</template>
