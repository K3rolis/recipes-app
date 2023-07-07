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
  ingredients: { name: string }[];
  methods: { description: string }[];
};

export type RecipeMethodsProps = {
  method: {
    description: string;
  };
  index: number;
};
