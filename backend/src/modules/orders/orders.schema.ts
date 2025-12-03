import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Order Product (for request)
export const OrderProductSchema = z.object({
    id: z.number().positive().describe('Product ID'),
    quantity: z.number().positive().describe('Quantity to order'),
});

// Create Order Request
export const CreateOrderSchema = z.object({
    customerId: z
        .string()
        .uuid()
        .describe('Unique customer identifier'),
    products: z
        .array(OrderProductSchema)
        .min(1, 'Order must contain at least one product')
        .describe('List of products to order'),
});

export class CreateOrderDto extends createZodDto(CreateOrderSchema) { }

// Order Product Detail (for response)
export const OrderProductDetailSchema = z.object({
    id: z.number().positive().describe('Product ID'),
    quantity: z.number().positive().describe('Quantity ordered'),
    name: z.string().describe('Product name'),
});

// Order Response
export const OrderResponseSchema = z.object({
    id: z.string().uuid().describe('Unique order identifier'),
    customerId: z.string().uuid().describe('Customer identifier'),
    orderCreatedDate: z
        .string()
        .pipe(z.coerce.date())
        .describe('Order creation timestamp'),
    orderUpdatedDate: z
        .string()
        .pipe(z.coerce.date())
        .describe('Order last updated timestamp'),
    status: z
        .enum(['PENDING', 'DISPATCHED', 'DELIVERED', 'CANCELLED'])
        .describe('Order status'),
    orderTotal: z.number().min(0).describe('Total order amount'),
    products: z
        .array(OrderProductDetailSchema)
        .describe('Ordered products with details'),
});

export class OrderResponse extends createZodDto(OrderResponseSchema) { }