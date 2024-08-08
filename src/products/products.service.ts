import { Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(
    name: string,
    category: string,
    description: string,
    images: string[],
    price: number,
    attributes: { name: string; value: string }[],
  ): Promise<Product> {
    const imagesJson = JSON.stringify(images);

    return this.prisma.product.create({
      data: {
        name,
        category,
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
    return this.prisma.product.findMany({
      include: {
        attributes: true,
      },
    });
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        attributes: true,
      },
    });
  }

  async updateProduct(
    id: number,
    name?: string,
    category?: string,
    description?: string,
    images?: string[],
    price?: number,
    attributes?: { name: string; value: string }[],
  ): Promise<Product> {
    const imagesJson = images ? JSON.stringify(images) : undefined;

    return this.prisma.product.update({
      where: { id },
      data: {
        name,
        category,
        description,
        images: imagesJson,
        price,
        attributes: {
          deleteMany: {},
          create: attributes,
        },
      },
    });
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async searchProducts(
    name?: string,
    category?: string,
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

    return this.prisma.product.findMany({
      where: {
        name: { contains: name },
        category: category ? { contains: category } : undefined,
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
  }
}
