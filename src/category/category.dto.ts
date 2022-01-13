export class CreateCategoryDto {
  name: string;
  description: string;
}

export class UpdateCategoryDto {
  id: string;
  name?: string;
  description?: string;
}
