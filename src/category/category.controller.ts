import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() categoryDto: CreateCategoryDto) {
    return this.categoryService.create(categoryDto);
  }

  @Get('all')
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    return this.categoryService.findOne(name);
  }
}
