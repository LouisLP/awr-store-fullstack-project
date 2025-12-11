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
        createdAt: new Date('2026-01-01T10:00:00Z'),
        updatedAt: new Date('2026-01-01T10:00:00Z'),
      };

      productsService.create.mockResolvedValue(mockServiceResponse);

      const result = await productsController.create(createProductDto);

      expect(productsService.create).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(mockServiceResponse);
    });
  });

  describe('findAll', () => {
    it('should return all products with transformed responses', async () => {
      const mockProducts = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          price: 99.99,
          availableCount: 10,
          createdAt: new Date('2026-01-01T10:00:00Z'),
          updatedAt: new Date('2026-01-01T10:00:00Z'),
        },
        {
          id: 2,
          name: 'Product 2',
          description: 'Description 2',
          price: 149.99,
          availableCount: 5,
          createdAt: new Date('2026-01-02T10:00:00Z'),
          updatedAt: new Date('2026-01-02T10:00:00Z'),
        },
      ];

      productsService.findMany.mockResolvedValue(mockProducts);

      const result = await productsController.findAll();

      expect(productsService.findMany).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result).toEqual(mockProducts);
    });
  });

  describe('findOne', () => {
    it('should return a single product by id', async () => {
      const mockProduct = {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        price: 99.99,
        availableCount: 10,
        createdAt: new Date('2026-01-01T10:00:00Z'),
        updatedAt: new Date('2026-01-01T10:00:00Z'),
      };

      productsService.findOne.mockResolvedValue(mockProduct);

      const result = await productsController.findOne(1);

      expect(productsService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('update', () => {
    it('should update a product and return the updated product', async () => {
      const updateProductDto = {
        name: 'Updated Product',
        price: 199.99,
      };

      const mockUpdatedProduct = {
        id: 1,
        name: 'Updated Product',
        description: 'Original description',
        price: 199.99,
        availableCount: 10,
        createdAt: new Date('2026-01-01T10:00:00Z'),
        updatedAt: new Date('2026-01-02T10:00:00Z'),
      };

      productsService.updateOne.mockResolvedValue(mockUpdatedProduct);

      const result = await productsController.update(1, updateProductDto);

      expect(productsService.updateOne).toHaveBeenCalledWith(1, updateProductDto);
      expect(result).toEqual(mockUpdatedProduct);
    });
  });

  describe('delete', () => {
    it('should delete a product and return success response', async () => {
      const mockResponse = { success: true };

      productsService.deleteOne.mockResolvedValue(mockResponse);

      const result = await productsController.delete(1);

      expect(productsService.deleteOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResponse);
    });
  });
});