import { Mocked, TestBed } from '@suites/unit';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateProductDto } from './products.schema';
import { ProductsService } from './products.service';
import { Prisma } from 'src/common/generated/prisma-client';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('Product Service Unit Tests', () => {
  let productService: ProductsService;
  let prismaService: Mocked<PrismaService>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(ProductsService).compile();

    productService = unit;
    prismaService = unitRef.get(PrismaService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a product with provided data', async () => {
      const createdProductData: CreateProductDto = {
        name: 'Mesmerizer 3000',
        description: 'An antique mesmerizer designed to captivate audiences.',
        price: 199.99,
        availableCount: 12,
      };

      prismaService.product.create.mockResolvedValueOnce({
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...createdProductData,
        price: new Prisma.Decimal(createdProductData.price),
      });

      const result = await productService.create(createdProductData);

      expect(prismaService.product.create).toHaveBeenCalledWith({
        data: createdProductData,
      });

      expect(result).toEqual({
        id: 1,
        name: 'Mesmerizer 3000',
        description: 'An antique mesmerizer designed to captivate audiences.',
        price: 199.99,
        availableCount: 12,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('findMany', () => {
    it('should return all products without taking pagination into account', async () => {
      const mockProducts = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          price: new Prisma.Decimal('99.99'),
          availableCount: 10,
          createdAt: new Date('2025-01-02'),
          updatedAt: new Date('2025-01-02'),
        },
        {
          id: 2,
          name: 'Product 2',
          description: 'Description 2',
          price: new Prisma.Decimal('149.99'),
          availableCount: 5,
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-01'),
        },
      ];

      prismaService.product.findMany.mockResolvedValueOnce(mockProducts);

      const result = await productService.findMany();

      expect(prismaService.product.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          price: 99.99,
          availableCount: 10,
          createdAt: new Date('2025-01-02'),
          updatedAt: new Date('2025-01-02'),
        },
        {
          id: 2,
          name: 'Product 2',
          description: 'Description 2',
          price: 149.99,
          availableCount: 5,
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-01'),
        },
      ]);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    it('should return empty array when no products exist', async () => {
      prismaService.product.findMany.mockResolvedValueOnce([]);

      const result = await productService.findMany();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should return retrieve matching product by using provided product id', async () => {
      const mockProduct = {
        id: 1,
        name: 'Test Product',
        description: 'Test Description',
        price: new Prisma.Decimal('99.99'),
        availableCount: 10,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
      };

      prismaService.product.findUnique.mockResolvedValueOnce(mockProduct);

      const result = await productService.findOne(1);

      expect(prismaService.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual({
        id: 1,
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        availableCount: 10,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
      });
    });

    it('should throw NotFoundException when product does not exist', async () => {
      prismaService.product.findUnique.mockResolvedValueOnce(null);

      await expect(productService.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(productService.findOne(999)).rejects.toThrow('Product with ID 999 not found');
    });
  });

  describe('updateOne', () => {
    it('should update and return the product with the given product id', async () => {
      const updateData = {
        name: 'Updated Product',
        price: 149.99,
      };

      const existingProduct = {
        id: 1,
        name: 'Original Product',
        description: 'Original Description',
        price: new Prisma.Decimal('99.99'),
        availableCount: 10,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
      };

      const updatedProduct = {
        ...existingProduct,
        ...updateData,
        price: new Prisma.Decimal(updateData.price),
        updatedAt: new Date('2025-01-02'),
      };

      prismaService.product.findUnique.mockResolvedValueOnce(existingProduct);
      prismaService.product.update.mockResolvedValueOnce(updatedProduct);

      const result = await productService.updateOne(1, updateData);

      expect(prismaService.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prismaService.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
      });
      expect(result).toEqual({
        id: 1,
        name: 'Updated Product',
        description: 'Original Description',
        price: 149.99,
        availableCount: 10,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-02'),
      });
    });

    it('should throw NotFoundException when product to update does not exist', async () => {
      prismaService.product.findUnique.mockResolvedValueOnce(null);

      await expect(productService.updateOne(999, { name: 'Updated' })).rejects.toThrow(NotFoundException);
      expect(prismaService.product.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteOne', () => {
    it('should delete a product with the given product id', async () => {
      const mockProduct = {
        id: 1,
        name: 'Test Product',
        description: 'Test Description',
        price: new Prisma.Decimal('99.99'),
        availableCount: 10,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
      };

      prismaService.product.findUnique.mockResolvedValueOnce(mockProduct);
      prismaService.orderItem.count.mockResolvedValueOnce(0);
      prismaService.product.delete.mockResolvedValueOnce(mockProduct);

      const result = await productService.deleteOne(1);

      expect(prismaService.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prismaService.orderItem.count).toHaveBeenCalledWith({
        where: { productId: 1 },
      });
      expect(prismaService.product.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual({ success: true });
    });

    it('should throw NotFoundException when product to delete does not exist', async () => {
      prismaService.product.findUnique.mockResolvedValueOnce(null);

      await expect(productService.deleteOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaService.orderItem.count).not.toHaveBeenCalled();
      expect(prismaService.product.delete).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when product has been ordered', async () => {
      const mockProduct = {
        id: 1,
        name: 'Test Product',
        description: 'Test Description',
        price: new Prisma.Decimal('99.99'),
        availableCount: 10,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
      };

      prismaService.product.findUnique.mockResolvedValueOnce(mockProduct);
      prismaService.orderItem.count.mockResolvedValueOnce(3);

      await expect(productService.deleteOne(1)).rejects.toThrow(
        new BadRequestException(
          'Cannot delete product with ID 1 because it has been ordered 3 time(s). ' +
          'Products that have been ordered cannot be deleted to maintain order history.'
        )
      );
      expect(prismaService.product.delete).not.toHaveBeenCalled();
    });
  });
});