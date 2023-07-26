import React from 'react';
import RecipeForm from './RecipeForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRecipe, updateRecipe } from '../../../api/recipes';
import { useNavigate, useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { RecipeProps } from '../../../types/recipes';

const RecipeEdit = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const { isLoading, data: recipe } = useQuery({
    queryKey: ['recipe', Number(recipeId)],
    queryFn: () => getRecipe(Number(recipeId)),
  });

  const updateRecipeMutation = useMutation({
    mutationFn: updateRecipe,
    onSuccess: (data) => {
      toast.success('Recipe was created Successfully!');
      navigate(`/recipes/category/${data.data.categoryId}/recipe/${Number(recipeId)}`);
    },
    onError: () => navigate(`/notFound`),
  });

  if (isLoading || updateRecipeMutation.isLoading) return <PropagateLoader className="loader" color="#36d7b7" />;

  const handleSubmit = (recipe: RecipeProps) => {
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
