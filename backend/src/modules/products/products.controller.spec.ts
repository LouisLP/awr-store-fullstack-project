import { Mocked, TestBed } from '@suites/unit';
import { ProductsController } from './products.controller';
import { CreateProductDto } from './products.schema';
import { ProductsService } from './products.service';
import { Prisma } from 'src/common/generated/prisma-client';

describe('Products Controller Unit Tests', () => {
  let productsController: ProductsController;
  let productsService: Mocked<ProductsService>;

  beforeAll(async () => {
    const { unit, unitRef } =
      await TestBed.solitary(ProductsController).compile();

    productsController = unit;
    productsService = unitRef.get(ProductsService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new product and return transformed response', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Foo Bar',
        description: 'The fooest of bars',
        price: 1.23,
        availableCount: 123,
      };

      const mockServiceResponse = {
        id: 1,
        ...createProductDto,
        price: new Prisma.Decimal(createProductDto.price),
        createdAt: new Date('2026-01-01T10:00:00Z'),
        updatedAt: new Date('2026-01-01T10:00:00Z'),
      };

      productsService.create.mockResolvedValue(mockServiceResponse);

      const result = await productsController.create(createProductDto);

      expect(productsService.create).toHaveBeenCalledWith(createProductDto);


      expect(result).toEqual({
        id: 1,
        name: 'Foo Bar',
        description: 'The fooest of bars',
        price: 1.23,
        availableCount: 123,
        createdAt: new Date('2026-01-01T10:00:00Z'),
        updatedAt: new Date('2026-01-01T10:00:00Z'),
      });
    });
  });

  describe('findAll', () => {
    it('should return all products with transformed responses', async () => {
      const mockProducts = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          price: new Prisma.Decimal('99.99'),
          availableCount: 10,
          createdAt: new Date('2026-01-01T10:00:00Z'),
          updatedAt: new Date('2026-01-01T10:00:00Z'),
        },
        {
          id: 2,
          name: 'Product 2',
          description: 'Description 2',
          price: new Prisma.Decimal('149.99'),
          availableCount: 5,
          createdAt: new Date('2026-01-02T10:00:00Z'),
          updatedAt: new Date('2026-01-02T10:00:00Z'),
        },
      ];

      productsService.findMany.mockResolvedValue(mockProducts);

      const result = await productsController.findAll();

      expect(productsService.findMany).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[0].price).toBe(99.99); // Converted to number
      expect(result[0].createdAt).toEqual(new Date('2026-01-01T10:00:00Z'));
    });
  });

  describe('findOne', () => {
    // Add tests here when you implement findOne
  });

  describe('update', () => {
    // Add tests here when you implement update
  });

  describe('delete', () => {
    // Add tests here when you implement delete
  });
});
