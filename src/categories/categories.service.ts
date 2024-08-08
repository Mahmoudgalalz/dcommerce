import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(
    name: string,
    attributes: string[],
    description?: string,
  ): Promise<Category> {
    return this.prisma.category.create({
      data: {
        name,
        description,
        attributes: attributes.join(','),
      },
    });
  }

  async getAllCategories() {
    const categories = await this.prisma.category.findMany();
    return categories.map((category) => ({
      ...category,
      attributes: category.attributes ? category.attributes.split(',') : [],
    }));
  }

  async getCategoryById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        Product: true,
      },
    });

    if (!category) {
      return null;
    }

    return {
      ...category,
      attributes: category.attributes ? category.attributes.split(',') : [],
    };
  }

  async updateCategory(
    id: number,
    name: string,
    description?: string,
    attributes?: string[],
  ): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: {
        name,
        description,
        attributes: attributes?.join(','),
      },
    });
  }

  async deleteCategory(id: number): Promise<Category> {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
