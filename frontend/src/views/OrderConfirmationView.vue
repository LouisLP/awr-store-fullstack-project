<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { useOrders } from '@/composables/useOrders'

const route = useRoute()

const { order, loading, error, fetchOrder } = useOrders()

onMounted(() => {
  const orderId = route.params.id as string
  fetchOrder(orderId)
})
</script>

<template>
  <div class="container mx-auto px-4 py-8 mt-12">
    <div class="max-w-md mx-auto space-y-8">
      <!-- Loading State -->
      <LoadingSpinner v-if="loading" />

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-error">
        <span>{{ error }}</span>
        <RouterLink to="/" class="btn btn-sm">
          Back to Shop
        </RouterLink>
      </div>

      <!-- Order Receipt -->
      <div v-else-if="order" class="styled-receipt rounded-2xl">
        <div class="card bg-black/30 shadow-xl">
          <div class="card-body px-6 py-8">
            <!-- Success Icon -->
            <div class="flex justify-center mb-2">
              <div class="rounded-full bg-success/20 p-1">
                <Icon icon="mdi:check-circle" class="text-success size-6" />
              </div>
            </div>

            <!-- Title -->
            <h2 class="text-3xl font-bold text-center">
              Order Placed!
            </h2>
            <p class="text-center text-base-content/60">
              <span class="font-mono text-sm">{{ order.id }}</span>
            </p>

            <div class="divider" />

            <!-- Order Info Grid -->
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center">
                <div class="text-sm text-base-content/60">
                  Order Date
                </div>
                <div class="font-semibold text-lg">
                  {{ new Date(order.orderCreatedDate).toLocaleDateString() }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-sm text-base-content/60">
                  Status
                </div>
                <div class="badge badge-success badge-lg">
                  {{ order.status }}
                </div>
              </div>
            </div>

            <!-- Customer ID -->
            <div class="text-center mt-3">
              <div class="text-xs text-base-content/40">
                Customer: <span class="font-mono">{{ order.customerId }}</span>
              </div>
            </div>

            <div class="divider" />

            <!-- Order Items -->
            <div>
              <h3 class="flex items-center justify-center gap-2 text-xl font-semibold mb-4">
                <Icon icon="mdi:package" class="size-6" />
                Items Ordered
              </h3>
              <div class="space-y-3">
                <div
                  v-for="product in order.products"
                  :key="product.id"
                  class="flex justify-between items-center p-4 bg-black/50 rounded-lg"
                >
                  <div>
                    <div class="font-semibold">
                      {{ product.name }}
                    </div>
                    <div class="text-sm text-base-content/60">
                      Qty: {{ product.quantity }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dashed separator for tear-off-kinda effect -->
            <div class="border-t-2 border-dashed border-base-content/30 -mx-8 my-6" />

            <!-- Total -->
            <div class="flex justify-between items-center px-4 mb-6">
              <span class="text-xl font-semibold">Total:</span>
              <span class="text-2xl font-bold text-primary">
                €{{ order.orderTotal.toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-center">
        <RouterLink
          to="/"
          class="btn btn-neutral btn-lg btn-wide"
        >
          Continue Shopping
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Reference for the ripped-off bottom part: https://stackoverflow.com/questions/73561793/create-a-responsive-receipt-cutoff-zig-zag-border */
.styled-receipt {
  --mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50%/30px 100%;
  -webkit-mask: var(--mask);
  mask: var(--mask);
}
</style>
