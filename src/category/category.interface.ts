export interface ICategory {
  name: string;
  description: string;
}

export interface IChangedCategory {
  id: string;
  name?: string;
  description?: string;
}
