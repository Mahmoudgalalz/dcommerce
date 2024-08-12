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
  ): Promise<any> {
    const imagesJson = JSON.stringify(images);

    const createdProduct = await this.prisma.product.create({
      data: {
        name,
        description,
        images: imagesJson,
        price,
        attributes: {
          create: attributes,
        },
      },
      include: {
        attributes: true,
      }
    });
    const updatedImages = createdProduct.images ? JSON.parse(createdProduct.images) : [];
  
    return {
      ...createdProduct,
      images: updatedImages,
    };
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
  ): Promise<any> {
    const imagesJson = images ? JSON.stringify(images) : undefined;
  
    if (attributes && attributes.length > 0) {
      await this.prisma.productAttribute.deleteMany({
        where: { productId: id },
      });
  
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

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        images: imagesJson,
        price,
      },
      include:{ attributes: true }
    });
  
    const updatedImages = updatedProduct.images ? JSON.parse(updatedProduct.images) : [];
  
    return {
      ...updatedProduct,
      images: updatedImages,
    };
  }
  
  

  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async searchProducts(
    searchValue?: string,
  ): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchValue,
            },
          },
          {
            attributes: {
              some: {
                OR: [
                  {
                    name: {
                      contains: searchValue,
                    },
                  },
                  {
                    value: {
                      contains: searchValue,
                    },
                  },
                ],
              },
            },
          },
        ],
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
