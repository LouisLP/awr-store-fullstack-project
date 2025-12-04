import { z } from 'zod'

export const OrderProductSchema = z.object({
  id: z.number(),
  quantity: z.number(),
})

export type OrderProduct = z.infer<typeof OrderProductSchema>

export const CreateOrderSchema = z.object({
  customerId: z.uuid(),
  products: z.array(OrderProductSchema).min(1),
})

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>

export const OrderProductDetailSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  name: z.string(),
})

export type OrderProductDetail = z.infer<typeof OrderProductDetailSchema>

export const OrderResponseSchema = z.object({
  id: z.uuid(),
  customerId: z.uuid(),
  orderCreatedDate: z.string(),
  orderUpdatedDate: z.string(),
  status: z.string(),
  orderTotal: z.number(),
  products: z.array(OrderProductDetailSchema),
})

export type OrderResponse = z.infer<typeof OrderResponseSchema>
