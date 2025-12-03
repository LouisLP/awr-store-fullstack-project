/** biome-ignore-all lint/style/useImportType: <explanation> */
import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService) { }
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
