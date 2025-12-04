<script setup lang="ts">
import { Icon } from '@iconify/vue'

import CartItem from '@/components/cart/CartItem.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

function updateQuantity(productId: number, quantity: number) {
  cartStore.updateQuantity(productId, quantity)
}

function removeFromCart(productId: number) {
  cartStore.removeFromCart(productId)
}

function clearCart() {
  cartStore.clearCart()
}
</script>

<template>
  <div class="container mx-auto px-4 py-8 mt-12 min-h-screen">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">
        Shopping Cart
      </h1>

      <!-- Clear cart button -->
      <button
        v-if="!cartStore.isEmpty"
        class="btn btn-outline btn-error"
        @click="clearCart"
      >
        <Icon icon="mdi:trash-can" class="size-4" />
        Clear Cart
      </button>
    </div>

    <!-- Cart items -->
    <div v-if="!cartStore.isEmpty" class="space-y-6">
      <!-- Cart items grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CartItem
          v-for="item in cartStore.items"
          :key="item.product.id"
          :item="item"
          @update-quantity="(quantity: number) => updateQuantity(item.product.id, quantity)"
          @remove-from-cart="removeFromCart(item.product.id)"
        />
      </div>

      <!-- Cart summary -->
      <div class="card bg-black/30 shadow-xl mt-8">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-4">
            Order Summary
          </h2>

          <div class="space-y-2">
            <div class="flex justify-between text-base-content/70">
              <span>Items ({{ cartStore.cartCount }}):</span>
              <span>€{{ cartStore.cartTotal.toFixed(2) }}</span>
            </div>

            <div class="flex justify-between text-base-content/70">
              <span>Shipping:</span>
              <span class="text-accent">Free for Aware employees</span>
            </div>

            <div class="divider my-2" />

            <div class="flex justify-between text-xl font-bold text-primary">
              <span class="text-white">Total:</span>
              <span class="tracking-wide">€{{ cartStore.cartTotal.toFixed(2) }}</span>
            </div>
          </div>

          <div class="card-actions justify-end mt-6">
            <RouterLink to="/checkout" class="btn btn-neutral btn-lg w-full">
              <Icon icon="mdi:credit-card" class="size-5" />
              Proceed to Checkout
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-16">
      <div class="card bg-black/30 shadow-md max-w-lg">
        <div class="card-body text-center">
          <Icon icon="mdi:cart-outline" class="size-24 mx-auto text-base-content/30 mb-4" />
          <h2 class="card-title justify-center text-2xl">
            Your cart is empty
          </h2>
          <p class="text-base-content/70 mb-3">
            You haven't added any items to your cart yet.
          </p>
          <div class="card-actions justify-center">
            <RouterLink to="/" class="btn btn-neutral">
              <Icon icon="mdi:arrow-left" class="size-4" />
              Continue Shopping
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
