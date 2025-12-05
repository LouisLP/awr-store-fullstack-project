<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

import type { Product } from '@/types/product'

import { useCartStore } from '@/stores/cart'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  addToCart: []
}>()

const cartStore = useCartStore()

const quantityInCart = computed(() => cartStore.getQuantityInCart(props.product.id))
const canAddMore = computed(() => cartStore.canAddToCart(props.product))
const isOutOfStock = computed(() => props.product.availableCount === 0)
const isMaxedOut = computed(() => quantityInCart.value >= props.product.availableCount)

const buttonText = computed(() => {
  if (isOutOfStock.value)
    return 'Out of Stock'
  if (isMaxedOut.value)
    return 'Max in Cart'
  if (quantityInCart.value > 0)
    return `Add More (${quantityInCart.value} in cart)`
  return 'Add to Cart'
})

const isButtonDisabled = computed(() => isOutOfStock.value || isMaxedOut.value)
</script>

<template>
  <div class="card ring-secondary bg-black/30 shadow-xl transition-all hover:shadow-2xl hover:ring-2">
    <div class="card-body">
      <h2 class="card-title">
        {{ product.name }}
      </h2>
      <p class="text-base-content/70 line-clamp-2 text-sm">
        {{ product.description }}
      </p>

      <div class="mt-4 flex items-center justify-between">
        <div>
          <div class="text-primary text-2xl font-bold">
            €{{ product.price.toFixed(2) }}
          </div>
          <div class="text-base-content/60 text-xs">
            <span
              class="badge"
              :class="product.availableCount > 0 ? 'badge-secondary' : 'badge-error'"
            >
              {{ product.availableCount }} in stock
            </span>
          </div>
        </div>
      </div>

      <div class="card-actions mt-4 justify-end">
        <button
          class="btn w-full"
          :class="{
            'btn-neutral': canAddMore,
            'btn-disabled': isButtonDisabled,
            'btn-accent': quantityInCart > 0 && canAddMore,
          }"
          :disabled="isButtonDisabled"
          @click="emit('addToCart')"
        >
          <Icon
            v-if="canAddMore"
            icon="mdi:plus"
            class="size-4 text-white"
          />
          <Icon
            v-else-if="isMaxedOut"
            icon="mdi:close"
            class="size-4"
          />
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>
