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
        attributes: JSON.stringify(attributes), // Store attributes as JSON string
      },
    });
  }

  async getAllCategories() {
    const categories = await this.prisma.category.findMany();
    return categories.map((category) => ({
      ...category,
      attributes: JSON.parse(category.attributes || '[]'), // Parse JSON string to array
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
      attributes: JSON.parse(category.attributes || '[]'), // Parse JSON string to array
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
        attributes: attributes ? JSON.stringify(attributes) : undefined, // Store as JSON string if provided
      },
    });
  }

  async deleteCategory(id: number): Promise<Category> {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
