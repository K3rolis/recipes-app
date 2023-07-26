import React from 'react';
import RecipeForm from './RecipeForm';
import { useMutation } from '@tanstack/react-query';
import { createRecipe } from '../../../api/recipes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { RecipeProps } from '../../../types/recipes';

type CategoryProps = {
  data: {
    categoryId: number;
    id: number;
  };
};

const RecipeCreate = () => {
  const navigate = useNavigate();
  const createRecipeMutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: (data: CategoryProps) => {
      toast.success('Recipe was created Successfully!');
      navigate(`/recipes/category/${data.data.categoryId}/recipe/${Number(data.data.id)}`);
    },
    onError: () => navigate(`/notFound`),
  });

  const handleSubmit = (recipe: RecipeProps) => {
    createRecipeMutation.mutate({
      ...recipe,
      servings: Number(recipe.servings),
      prepTime: Number(recipe.prepTime),
      cookingTime: Number(recipe.cookingTime),
    });
  };
  return <RecipeForm onSubmit={handleSubmit} initialValue={{} as RecipeProps} />;
};

export default RecipeCreate;
