<script setup>
import { RouterView } from 'vue-router'

import Footer from '@/components/ui/BaseFooter.vue'
import Navbar from '@/components/ui/BaseNavbar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />

    <main class="flex-1">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
