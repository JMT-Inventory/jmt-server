import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() categoryDto: CreateCategoryDto) {
    return this.categoryService.create(categoryDto);
  }

  @Put()
  async update(@Body() categoryDto: UpdateCategoryDto) {
    return this.categoryService.update(categoryDto);
  }

  @Get('all')
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    return this.categoryService.findOne(name);
  }

  @Delete('all')
  async deleteAll() {
    return this.categoryService.deleteAll();
  }

  @Delete(':name')
  async deleteOne(@Param('name') name: string) {
    return this.categoryService.deleteOne(name);
  }
}
