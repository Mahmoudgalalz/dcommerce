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
    const { name, category, description, images, price, attributes } =
      createProductDto;
    return this.productService.createProduct(
      name,
      category,
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
    @Query('category') category?: string,
    @Query('attributes') attributes?: string, // Format: "key:value,key:value"
  ) {
    let parsedAttributes = [];
    if (attributes) {
      parsedAttributes = attributes.split(',').map((attr) => {
        const [name, value] = attr.split(':');
        return { name, value };
      });
    }
    return this.productService.searchProducts(name, category, parsedAttributes);
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
    const { name, category, description, images, price, attributes } =
      updateProductDto;
    return this.productService.updateProduct(
      +id,
      name,
      category,
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
