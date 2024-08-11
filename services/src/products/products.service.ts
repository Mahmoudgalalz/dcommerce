import { Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(
    name: string,
    description: string,
    images: string[],
    price: number,
    attributes: { name: string; value: string }[],
  ): Promise<Product> {
    const imagesJson = JSON.stringify(images);

    return this.prisma.product.create({
      data: {
        name,
        description,
        images: imagesJson,
        price,
        attributes: {
          create: attributes,
        },
      },
    });
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: {
        attributes: true,
      },
    });

    return products.map((product) => ({
      ...product,
      images: product.images ? JSON.parse(product.images) : [],
    }));
  }

  async getProductById(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        attributes: true,
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.images ? JSON.parse(product.images) : [],
    };
  }

  async updateProduct(
    id: number,
    name?: string,
    description?: string,
    images?: string[],
    price?: number,
    attributes?: { id?: number; name: string; value: string }[],
  ): Promise<Product> {
    const imagesJson = images ? JSON.stringify(images) : undefined;
  
    // Update the main product details
    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        images: imagesJson,
        price,
      },
    });
  
    // Update attributes
    if (attributes && attributes.length > 0) {
      // Delete existing attributes associated with the product
      await this.prisma.productAttribute.deleteMany({
        where: { productId: id },
      });
  
      // Create new attributes
      for (const attr of attributes) {
        await this.prisma.productAttribute.create({
          data: {
            name: attr.name,
            value: attr.value,
            productId: id,
          },
        });
      }
    }
  
    return updatedProduct;
  }
  

  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async searchProducts(
    name?: string,
    attributes?: { name: string; value: string }[],
  ): Promise<Product[]> {
    const attributeConditions: Prisma.ProductAttributeWhereInput[] = [];

    if (attributes) {
      attributes.forEach((attribute) => {
        attributeConditions.push({
          name: attribute.name,
          value: attribute.value,
        });
      });
    }

    const products = await this.prisma.product.findMany({
      where: {
        name: { contains: name },
        attributes: attributeConditions.length
          ? {
              some: {
                AND: attributeConditions,
              },
            }
          : undefined,
      },
      include: {
        attributes: true,
      },
    });

    return products.map((product) => ({
      ...product,
      images: product.images ? JSON.parse(product.images) : [],
    }));
  }
}
