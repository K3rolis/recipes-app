export type RecipeProps = {
  id?: number;
  userId: number;
  categoryId: string;
  title: string;
  imageUrl: string;
  servings: number;
  prepTime: number;
  cookingTime: number;
  description: string;
  ingredients: any;
  methods: any;
};

export type RecipeMethodsProps = {
  method: {
    description: string;
  };
  index: number;
};
