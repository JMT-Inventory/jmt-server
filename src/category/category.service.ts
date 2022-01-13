import { Injectable } from '@nestjs/common';
import { ICategory } from './category.interface';
import { PrismaService } from '../prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(category: ICategory): Promise<Category> {
    return this.prisma.category.create({ data: category });
  }

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }
}
