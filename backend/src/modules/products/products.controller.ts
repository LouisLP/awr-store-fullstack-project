/** biome-ignore-all lint/style/useImportType: <explanation> */
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateProductDto, ProductResponse } from './products.schema';
import { ProductsService } from './products.service';

@Controller('products')
@ApiExtraModels(ProductResponse)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a new Product resource.',
  })
  @ApiCreatedResponse({
    description: 'Returned when a new Product was created successfully.',
    schema: {
      $ref: getSchemaPath(ProductResponse),
    },
  })
  @ApiBadRequestResponse({
    description:
      'Returned when one or more parameters failed validation during Product creation',
  })
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponse> {
    const product = await this.productsService.create(createProductDto);
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

  @Get()
  @ApiOperation({
    summary: 'Retrieves all Product resources.',
  })
  @ApiOkResponse({
    description: 'Returned when products were retrieved successfully.',
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(ProductResponse),
      },
    },
  })
  async findAll(): Promise<ProductResponse[]> {
    const products = await this.productsService.findMany();
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      availableCount: product.availableCount,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));
  }
}
