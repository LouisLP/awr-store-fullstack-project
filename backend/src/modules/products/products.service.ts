import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import type { Product } from 'src/common/generated/prisma-client';
import { CreateProductDto, UpdateProductDto, ProductResponse } from './products.schema';
import type { GenericOperationResponse } from 'src/common/schemas/generic-operation-response.schema';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * Transform Prisma Product to ProductResponse
   * Converts Decimal to number and Date to ISO string
   */
  private transformProduct(product: Product): ProductResponse {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      availableCount: product.availableCount,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  async create(createProductDto: CreateProductDto): Promise<ProductResponse> {
    const created = await this.prisma.product.create({
      data: createProductDto,
    });
    return this.transformProduct(created);
  }

  async findMany(): Promise<ProductResponse[]> {
    const products = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return products.map((product) => this.transformProduct(product));
  }

  async findOne(id: number): Promise<ProductResponse> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return this.transformProduct(product);
  }

  async updateOne(id: number, updateProductDto: UpdateProductDto): Promise<ProductResponse> {
    await this.findOne(id);

    const updated = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });

    return this.transformProduct(updated);
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