import React from 'react';
import RecipeForm from './RecipeForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRecipe, updateRecipe } from '../../../api/recipes';
import { useParams } from 'react-router-dom';

type Props = {};

const RecipeEdit = (props: Props) => {
  const { recipeId } = useParams();

  const {
    isLoading,
    isError,
    data: recipe,
  } = useQuery({
    queryKey: ['recipe', Number(recipeId)],
    queryFn: () => getRecipe(Number(recipeId)),
  });

  const updateRecipeMutation = useMutation({
    mutationFn: updateRecipe,
    onSuccess: (data) => {
      //   queryClient.setQueriesData(['users', Number(userId)], data);
      //   navigate(`/users/${Number(userId)}`);
    },
  });

  if (isLoading) return <h1>Loading...</h1>;

  const handleSubmit = (recipe: any) => {
    console.log(recipe);
    updateRecipeMutation.mutate({
      id: Number(recipeId),
      ...recipe,
      servings: Number(recipe.servings),
      prepTime: Number(recipe.prepTime),
      cookingTime: Number(recipe.cookingTime),
    });
  };
  return <RecipeForm onSubmit={handleSubmit} initialValue={recipe} />;
};

export default RecipeEdit;
