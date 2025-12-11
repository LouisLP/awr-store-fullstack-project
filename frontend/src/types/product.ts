import { z } from 'zod'

// Product schema matching backend modl
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  availableCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Product = z.infer<typeof ProductSchema>

// Create Product DTO (for form)
export const CreateProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(255),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  availableCount: z.number().int().nonnegative('Available count must be non-negative'),
})

export type CreateProductDto = z.infer<typeof CreateProductSchema>

export const UpdateProductSchema = CreateProductSchema.partial()

export type UpdateProductDto = z.infer<typeof UpdateProductSchema>
