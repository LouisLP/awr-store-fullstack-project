/** biome-ignore-all lint/style/useImportType: <explanation> */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Product } from 'src/common/generated/prisma-client';
import { CreateProductDto } from './products.schema';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const created = await this.prisma.product.create({
      data: createProductDto,
    });
    return created;
  }

  async findMany(): Promise<Product[]> {
    return await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // May be implemented
  // @ts-ignore
  async findOne(): Promise<Product> { }

  // May be implemented
  // @ts-ignore
  async updateOne(): Promise<Product> { }

  // May be implemented.
  // Note: This operation returns a promise of GenericOperationResponse
  // which contains a flag that denotes whether or not the operation
  // was successful.
  //@ts-ignore
  async deleteOne(): Promise<GenericOperationResponse> { }
}