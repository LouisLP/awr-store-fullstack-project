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
  <div class="container mx-auto mt-12 px-4 py-8">
    <div class="mx-auto max-w-2xl">
      <h1 class="mb-8 text-4xl font-bold">
        Create New Product
      </h1>

      <div v-if="error" class="alert alert-error mb-6">
        <span>{{ error }}</span>
      </div>

      <form class="card bg-black/30" @submit="onSubmit">
        <div class="card-body space-y-4">
          <!-- Fieldset (thanks DaisyUI) -->
          <fieldset class="fieldset border-secondary rounded-box space-y-6 border p-6">
            <legend class="text-lg font-bold">
              Product Details
            </legend>

            <!-- Name -->
            <div class="form-control space-y-2">
              <label class="label font-semibold">Product Name</label>
              <input
                v-model="name"
                v-bind="nameAttrs"
                type="text"
                placeholder="Enter product name"
                class="input input-bordered w-full"
                :class="{ 'input-error': errors.name }"
              >
              <span v-if="errors.name" class="text-error text-sm">{{ errors.name }}</span>
            </div>

            <!-- Description -->
            <div class="form-control space-y-2">
              <label class="label font-semibold">Description</label>
              <textarea
                v-model="description"
                v-bind="descriptionAttrs"
                placeholder="Enter product description"
                class="textarea textarea-bordered h-24 w-full"
                :class="{ 'textarea-error': errors.description }"
              />
              <span v-if="errors.description" class="text-error text-sm">{{ errors.description }}</span>
            </div>

            <!-- Price -->
            <div class="form-control space-y-2">
              <label class="label font-semibold">Price (€)</label>
              <input
                v-model.number="price"
                v-bind="priceAttrs"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                class="input input-bordered w-full"
                :class="{ 'input-error': errors.price }"
              >
              <span v-if="errors.price" class="text-error text-sm">{{ errors.price }}</span>
            </div>

            <!-- Available Count -->
            <div class="form-control space-y-2">
              <label class="label font-semibold">Available Count</label>
              <input
                v-model.number="availableCount"
                v-bind="availableCountAttrs"
                type="number"
                min="0"
                placeholder="0"
                class="input input-bordered w-full"
                :class="{ 'input-error': errors.availableCount }"
              >
              <span v-if="errors.availableCount" class="text-error text-sm">{{ errors.availableCount }}</span>
            </div>
          </fieldset>

          <div class="card-actions justify-end pt-4">
            <RouterLink
              to="/admin"
              class="btn btn-ghost"
            >
              Cancel
            </RouterLink>

            <button
              type="submit"
              class="btn btn-neutral"
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
</template>
