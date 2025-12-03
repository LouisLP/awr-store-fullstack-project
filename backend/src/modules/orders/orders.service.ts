/** biome-ignore-all lint/style/useImportType: <explanation> */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Prisma } from 'src/common/generated/prisma-client';
import { CreateOrderDto } from './orders.schema';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new order and verifies the following:
   * - Validates availability of the products
   * - Calculates order total
   * - Creates order (with its order items)
   * - Decrements product's inventory (availableCount)
   */
  async create(createOrderDto: CreateOrderDto) {
    return await this.prisma.$transaction(async (tx) => {
      // 1. Fetch all requested products
      const productIds = createOrderDto.products.map((p) => p.id);
      const products = await tx.product.findMany({
        where: { id: { in: productIds } },
      });

      // 2. Validate they actually exist
      if (products.length !== productIds.length) {
        const foundIds = products.map((p) => p.id);
        const missingIds = productIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(
          `Products with the following IDs not found: ${missingIds.join(', ')}`,
        );
      }

      // 3. Map for easy lookup
      const productMap = new Map(
        products.map((product) => [product.id, product]),
      );

      // Validate inventory availability
      for (const orderProduct of createOrderDto.products) {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const product = productMap.get(orderProduct.id)!;
        if (product.availableCount < orderProduct.quantity) {
          throw new BadRequestException(
            `Insufficient availability for "${product.name}"... Available: ${product.availableCount}, Requested: ${orderProduct.quantity}`,
          );
        }
      }

      // 5. Calculate total $$$
      const orderTotal = createOrderDto.products.reduce((sum, orderProduct) => {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const product = productMap.get(orderProduct.id)!;
        return sum + Number(product.price) * orderProduct.quantity;
      }, 0);

      // 6. Create order (with order items on it)
      const order = await tx.order.create({
        data: {
          customerId: createOrderDto.customerId,
          orderTotal: new Prisma.Decimal(orderTotal),
          status: 'DISPATCHED', // From the example, but this is also the default on the prisma schema
          orderItems: {
            create: createOrderDto.products.map((p) => ({
              productId: p.id,
              quantity: p.quantity,
            })),
          },
        },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      // 7. Decrement product's inventory (availableCount)
      for (const orderProduct of createOrderDto.products) {
        await tx.product.update({
          where: { id: orderProduct.id },
          data: {
            availableCount: {
              decrement: orderProduct.quantity,
            },
          },
        });
      }

      return order;
    });
  }

  /**
   * Retrieves an order by ID with all related data
   */
  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }

    // Transform to match expected response format (from schema)
    return {
      id: order.id,
      customerId: order.customerId,
      orderCreatedDate: order.orderCreatedDate.toISOString(),
      orderUpdatedDate: order.orderUpdatedDate.toISOString(),
      status: order.status,
      orderTotal: Number(order.orderTotal),
      products: order.orderItems.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
        name: item.product.name,
      })),
    };
  }
}
