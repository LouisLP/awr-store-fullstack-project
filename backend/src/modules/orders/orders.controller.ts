/** biome-ignore-all lint/style/useImportType: <explanation> */
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateOrderDto, OrderResponse } from './orders.schema';
import { OrdersService } from './orders.service';

@Controller('orders')
@ApiExtraModels(OrderResponse)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a new Order resource.',
  })
  @ApiCreatedResponse({
    description: 'Returned when a new Order was created successfully.',
    schema: {
      $ref: getSchemaPath(OrderResponse),
    },
  })
  @ApiBadRequestResponse({
    description:
      'Returned when validation fails or insufficient stock is available',
  })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<OrderResponse> {
    const order = await this.ordersService.create(createOrderDto);

    // Transform raw Prisma result to match OrderResponse (mapping products, and converting dates)
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

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieves an Order resource by ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Order UUID',
    type: 'string',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Returned when the order was found.',
    schema: {
      $ref: getSchemaPath(OrderResponse),
    },
  })
  @ApiNotFoundResponse({
    description: 'Returned when the order was not found.',
  })
  async findOne(
    // biome-ignore lint/style/useBlockStatements: NestJS decorator pattern
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<OrderResponse> {
    const order = await this.ordersService.findOne(id);

    return {
      id: order.id,
      customerId: order.customerId,
      orderCreatedDate: order.orderCreatedDate,
      orderUpdatedDate: order.orderUpdatedDate,
      status: order.status,
      orderTotal: Number(order.orderTotal),
      products: order.products,
    };
  }
}
