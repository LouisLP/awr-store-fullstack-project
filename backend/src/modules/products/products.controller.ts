import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
import {
  CreateProductDto,
  ProductResponse,
  UpdateProductDto,
} from './products.schema';
import { ProductsService } from './products.service';
import { GenericOperationResponse } from 'src/common/schemas/generic-operation-response.schema';

@Controller('products')
@ApiExtraModels(ProductResponse, GenericOperationResponse)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

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
    return await this.productsService.create(createProductDto);
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
    return await this.productsService.findMany();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieves a single Product resource by ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    type: 'number',
  })
  @ApiOkResponse({
    description: 'Returned when the product was found.',
    schema: {
      $ref: getSchemaPath(ProductResponse),
    },
  })
  @ApiNotFoundResponse({
    description: 'Returned when the product was not found.',
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductResponse> {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates a Product resource.',
  })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    type: 'number',
  })
  @ApiOkResponse({
    description: 'Returned when the product was updated successfully.',
    schema: {
      $ref: getSchemaPath(ProductResponse),
    },
  })
  @ApiNotFoundResponse({
    description: 'Returned when the product was not found.',
  })
  @ApiBadRequestResponse({
    description: 'Returned when validation fails.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponse> {
    return await this.productsService.updateOne(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a Product resource.',
  })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    type: 'number',
  })
  @ApiOkResponse({
    description: 'Returned when the product was deleted successfully.',
    schema: {
      $ref: getSchemaPath(GenericOperationResponse),
    },
  })
  @ApiNotFoundResponse({
    description: 'Returned when the product was not found.',
  })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GenericOperationResponse> {
    return await this.productsService.deleteOne(id);
  }
}