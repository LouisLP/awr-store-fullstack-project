<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="navbar bg-neutral shadow-sm">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-xl">
        Template
      </RouterLink>
    </div>

    <div class="flex-none">
      <!-- Cart -->
      <button tabindex="0" role="button" class="btn btn-ghost">
        <Icon icon="mdi:cart" class="size-6 text-white" />
        <!-- TODO: num of cart items -->
        <div class="indicator-item ml-1">
          7 items
        </div>
      </button>
    </div>
  </div>
</template>
