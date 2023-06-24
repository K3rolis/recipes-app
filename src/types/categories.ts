export type CategoriesProps = {
  id?: number;
  name: string;
  imageUrl: string;
  slug: string;
};

export type CategoryRecipesProps = {
  id?: number;
  category: string;
  title: string;
  prepTime: number;
  cookingTime: number;
  servings: number;
  imageUrl: string;
};
