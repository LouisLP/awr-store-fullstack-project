import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import type { Product } from 'src/common/generated/prisma-client';
import { CreateProductDto, UpdateProductDto } from './products.schema';
import type { GenericOperationResponse } from 'src/common/schemas/generic-operation-response.schema';

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

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async updateOne(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.findOne(id);

    const updated = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });

    return updated;
  }

  async deleteOne(id: number): Promise<GenericOperationResponse> {
    await this.findOne(id);

    await this.prisma.product.delete({
      where: { id },
    });

    return {
      success: true,
    };
  }
}