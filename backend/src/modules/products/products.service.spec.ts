import { Mocked, TestBed } from '@suites/unit';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateProductDto } from './products.schema';
import { ProductsService } from './products.service';
import { Prisma } from 'src/common/generated/prisma-client';

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
      expect(result).toEqual(expect.objectContaining(createdProductData));
    });
  });

  // Note: The following test cases can be completed at your convenience.
  // Furthermore, any additional tests for covering edge cases or to increase
  // code coverage is left up to your discretion.
  describe('findMany', () => {
    // Note: Pagination support is not expected for this project, but should you
    // decide to implement pagination support please also consider adding the
    // appropriate tests.
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
      expect(result).toEqual(mockProducts);
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
    it('should return retrieve matching product by using provided product id', async () => { });
  });

  describe('updateOne', () => {
    it('should update and return the product with the given product id', async () => { });
  });

  describe('deleteOne', () => {
    it('should delete a product with the given product id', async () => { });
  });
});
