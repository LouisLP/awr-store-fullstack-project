<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'

import { useProducts } from '@/composables/useProducts'
import { CreateProductSchema } from '@/types/product'

const router = useRouter()
const { createProduct, loading, error } = useProducts()

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(CreateProductSchema),
  initialValues: {
    name: '',
    description: '',
    price: 0,
    availableCount: 0,
  },
})

const [name, nameAttrs] = defineField('name')
const [description, descriptionAttrs] = defineField('description')
const [price, priceAttrs] = defineField('price')
const [availableCount, availableCountAttrs] = defineField('availableCount')

const onSubmit = handleSubmit(async (values) => {
  try {
    await createProduct(values)
    router.push('/admin')
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {
    // Error handled in composable
  }
})
</script>

<template>
  <div class="mt-12">
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl font-bold mb-8">
          Create New Product
        </h1>

        <div v-if="error" class="alert alert-error mb-6">
          <span>{{ error }}</span>
        </div>

        <form class="card bg-base-100 shadow-xl" @submit="onSubmit">
          <div class="card-body space-y-6">
            <!-- Name -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Product Name</span>
              </label>
              <input
                v-model="name"
                v-bind="nameAttrs"
                type="text"
                placeholder="Enter product name"
                class="input input-bordered"
                :class="{ 'input-error': errors.name }"
              >
              <label v-if="errors.name" class="label">
                <span class="label-text-alt text-error">{{ errors.name }}</span>
              </label>
            </div>

            <!-- Description -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Description</span>
              </label>
              <textarea
                v-model="description"
                v-bind="descriptionAttrs"
                placeholder="Enter product description"
                class="textarea textarea-bordered h-24"
                :class="{ 'textarea-error': errors.description }"
              />
              <label v-if="errors.description" class="label">
                <span class="label-text-alt text-error">{{ errors.description }}</span>
              </label>
            </div>

            <!-- Price -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Price (€)</span>
              </label>
              <input
                v-model.number="price"
                v-bind="priceAttrs"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                class="input input-bordered"
                :class="{ 'input-error': errors.price }"
              >
              <label v-if="errors.price" class="label">
                <span class="label-text-alt text-error">{{ errors.price }}</span>
              </label>
            </div>

            <!-- Available Count -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Available Count</span>
              </label>
              <input
                v-model.number="availableCount"
                v-bind="availableCountAttrs"
                type="number"
                min="0"
                placeholder="0"
                class="input input-bordered"
                :class="{ 'input-error': errors.availableCount }"
              >
              <label v-if="errors.availableCount" class="label">
                <span class="label-text-alt text-error">{{ errors.availableCount }}</span>
              </label>
            </div>

            <!-- Actions -->
            <div class="card-actions justify-end gap-2 pt-4">
              <button
                type="button"
                class="btn btn-ghost"
                @click="router.push('/admin')"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="loading"
              >
                <span v-if="loading" class="loading loading-spinner" />
                <Icon v-else icon="mdi:content-save" class="size-4" />
                {{ loading ? 'Creating...' : 'Create Product' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
