import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const { name, description, images, price, attributes } =
      createProductDto;
    return this.productService.createProduct(
      name,
      description,
      images,
      price,
      attributes,
    );
  }

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('search')
  async searchProducts(
    @Query('name') name?: string,
  ) {
    return this.productService.searchProducts(name);
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productService.getProductById(+id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const { name, description, images, price, attributes } =
      updateProductDto;
    return this.productService.updateProduct(
      +id,
      name,
      description,
      images,
      price,
      attributes,
    );
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(+id);
  }
}
