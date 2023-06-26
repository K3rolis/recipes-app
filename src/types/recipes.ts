export type CreateRecipesProps = {
  id?: number;
  userId: number;
  categoryId: number;
  title: string;
  imageUrl: string;
  servings: number;
  prepTime: number;
  cookingTime: number;
  description: string;
  ingredients: any;
  methods: any;
};
