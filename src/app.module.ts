import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import { DatabaseKnownExceptionFilter } from './common/filters/database.filter';

@Module({
  imports: [CategoryModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DatabaseKnownExceptionFilter,
    },
  ],
})
export class AppModule {}
