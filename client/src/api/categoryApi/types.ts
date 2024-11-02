export interface CategoryResponse {
  categoryName: string;
  cardColor: string;
  createdBy: string;
  deletable: boolean;
  id: string;
}

export interface CategoriesWithTaskAndChecklistCount extends CategoryResponse {
  taskCount: number;
  checklistCount: number;
}

export interface CategoryPayload {
  categoryName: string;
  cardColor: string;
}

export interface UpdateCategoryPayload extends CategoryPayload {
  id: string;
}
