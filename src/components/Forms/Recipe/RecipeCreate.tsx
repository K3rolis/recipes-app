import React from 'react';
import RecipeForm from './RecipeForm';
import { useMutation } from '@tanstack/react-query';
import { createRecipe } from '../../../api/recipes';

const RecipeCreate = () => {
  const createRecipeMutation = useMutation({
    mutationFn: createRecipe,
  });

  const handleSubmit = (recipe: any) => {
    createRecipeMutation.mutate({
      ...recipe,
      servings: Number(recipe.servings),
      prepTime: Number(recipe.prepTime),
      cookingTime: Number(recipe.cookingTime),
    });
  };
  return <RecipeForm onSubmit={handleSubmit} initialValue={{}} />;
};

export default RecipeCreate;
