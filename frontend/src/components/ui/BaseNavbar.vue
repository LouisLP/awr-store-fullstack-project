<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <div class="navbar bg-neutral shadow-sm">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-xl">
        Aware Shop
      </RouterLink>
    </div>

    <div class="flex-none">
      <RouterLink to="/admin" class="btn btn-ghost">
        Admin
      </RouterLink>

      <!-- Cart button -->
      <!-- TODO: route to /cart -->
      <RouterLink to="/" class="btn btn-ghost">
        <Icon icon="mdi:cart" class="size-6 text-white" />
        <div class="indicator-item ml-1">
          {{ cartStore.cartCount }}
        </div>
      </RouterLink>
    </div>
  </div>
</template>
