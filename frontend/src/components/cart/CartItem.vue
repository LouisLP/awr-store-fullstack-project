<script setup lang="ts">
import { Icon } from '@iconify/vue'

import type { CartItem } from '@/types/cart'

defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  updateQuantity: [quantity: number]
  removeFromCart: []
}>()
</script>

<template>
  <div class="card bg-black/30 shadow-md">
    <div class="card-body">
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <h2 class="card-title text-lg">
            {{ item.product.name }}
          </h2>
        </div>

        <!-- Remove button -->
        <button
          class="btn btn-ghost btn-sm text-error hover:bg-error/20"
          @click="emit('removeFromCart')"
        >
          <Icon icon="mdi:close" class="size-4" />
        </button>
      </div>

      <div class="flex justify-between items-center">
        <div>
          <div class="text-xl font-bold text-primary">
            €{{ item.product.price.toFixed(2) }}
          </div>
          <div class="text-xs text-base-content/60">
            /item
          </div>
        </div>

        <!-- Quantity controls -->
        <div class="flex items-center gap-2">
          <button
            class="btn btn-ghost btn-sm"
            :disabled="item.quantity <= 1"
            @click="emit('updateQuantity', item.quantity - 1)"
          >
            <Icon icon="mdi:minus" class="size-4" />
          </button>

          <div class="badge badge-neutral font-bold px-3 select-none">
            {{ item.quantity }}
          </div>

          <button
            class="btn btn-ghost btn-sm"
            :disabled="item.quantity >= item.product.availableCount"
            @click="emit('updateQuantity', item.quantity + 1)"
          >
            <Icon icon="mdi:plus" class="size-4" />
          </button>
        </div>
      </div>

      <!-- Item total -->
      <div class="flex justify-between items-center mt-4 pt-4 border-t border-base-content/10">
        <span class="text-sm text-base-content/70">Item total:</span>
        <div class="text-xl font-bold text-secondary">
          €{{ (item.product.price * item.quantity).toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>
