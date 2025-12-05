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
      <div class="flex items-start justify-between">
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

      <div class="flex items-center justify-between">
        <div>
          <div class="text-primary text-xl font-bold">
            €{{ item.product.price.toFixed(2) }}
          </div>
          <div class="text-base-content/60 text-xs">
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

          <div class="badge badge-neutral px-3 font-bold select-none">
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
      <div class="border-base-content/10 mt-4 flex items-center justify-between border-t pt-4">
        <span class="text-base-content/70 text-sm">Item total:</span>
        <div class="text-primary text-xl font-bold">
          €{{ (item.product.price * item.quantity).toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>
