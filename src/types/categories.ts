export type CategoriesProps = {
  id?: any;
  name: string;
  imageUrl: string;
};

export type CategoryRecipesProps = {
  id?: number;
  categoryId: number;
  categoryName: string;
  title: string;
  prepTime: number;
  cookingTime: number;
  servings: number;
  imageUrl: string;
};
