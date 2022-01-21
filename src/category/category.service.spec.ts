import { Test } from '@nestjs/testing';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { randomUUID } from 'crypto';

import { CategoryService } from './category.service';
import { PrismaService } from '../prisma.service';
import { BadRequestException } from '@nestjs/common';

type PrismaMockProxy = DeepMockProxy<PrismaService>;

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let mockedPrisma: PrismaMockProxy;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: PrismaService,
          useFactory: () => mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    categoryService = moduleRef.get<CategoryService>(CategoryService);
    mockedPrisma = moduleRef.get(PrismaService) as PrismaMockProxy;
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
    expect(mockedPrisma).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new category', async () => {
      const category = {
        id: randomUUID(),
        name: 'perishable',
        description: 'Perishable products after a period of time',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockedPrisma.category.create.mockResolvedValue(category);

      const newCategory = await categoryService.create({
        name: category.name,
        description: category.description,
      });

      expect(newCategory).toBe(category);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories = [
        {
          id: randomUUID(),
          name: 'perishable',
          description: 'Perishable products after a period of time',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: randomUUID(),
          name: 'non perishable',
          description: 'Products that are not perishable after a while',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockedPrisma.category.findMany.mockResolvedValue(categories);

      const returnedCategories = await categoryService.findAll();

      const uuidRegex =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

      expect(returnedCategories).toBeArray();
      expect(returnedCategories).not.toBeEmpty();
      expect(returnedCategories).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.stringMatching(uuidRegex),
            name: 'perishable',
            description: 'Perishable products after a period of time',
            createdAt: expect.toBeDate(),
            updatedAt: expect.toBeDate(),
          }),
        ]),
      );
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      const category = {
        id: randomUUID(),
        name: 'perishable',
        description: 'Perishable products after a period of time',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockedPrisma.category.findUnique.mockResolvedValue(category);

      const returnedCategory = await categoryService.findOne('perishable');

      expect(returnedCategory).toBe(category);
    });

    it('should throw a bad request error', () => {
      const categoryName = 'perishable';

      mockedPrisma.category.findUnique.mockResolvedValue(null);

      async function runMethodForTest() {
        await categoryService.findOne(categoryName);
      }

      expect(runMethodForTest).rejects.toThrowError(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update and return a category', async () => {
      const category = {
        id: randomUUID(),
        name: 'perishable',
        description: 'Perishable products after a period of time',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockedPrisma.category.update.mockResolvedValue(category);

      const updatedCategory = await categoryService.update({
        id: category.id,
        name: category.name,
        description: category.description,
      });

      expect(updatedCategory).toBe(category);
    });
  });
});
