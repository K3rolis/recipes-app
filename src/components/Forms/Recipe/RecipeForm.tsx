import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LoginContext } from '../../Contexts/LoginContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createRecipe } from '../../../api/recipes';
import { getCategories } from '../../../api/categories';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { CreateRecipesProps } from '../../../types/recipes';

const RecipeForm = ({ onSubmit, initialValue }: any) => {
  const { authUser } = useContext(LoginContext);
  const [recipe, setRecipe] = useState<CreateRecipesProps>({
    userId: authUser.id,
    categoryId: initialValue.categoryId || '',
    title: initialValue.title || '',
    imageUrl: initialValue.imageUrl || '',
    servings: initialValue.servings || '',
    prepTime: initialValue.prepTime || '',
    cookingTime: initialValue.cookingTime || '',
    description: initialValue.description || '',
    ingredients: initialValue.ingredients || [{ name: '' }],
    methods: initialValue.methods || [{ description: '' }],
  });

  const changeInputValue = (e: any) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleIngredientsInput = (index: any, e: any) => {
    const { name, value } = e.target;
    const list = [...recipe.ingredients];
    list[index][name] = value;

    setRecipe({ ...recipe, ingredients: list });
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { name: '' }] });
  };

  const handleRemoveIngredient = (index: number) => {
    const list = { ...recipe };
    list.ingredients.splice(index, 1);
    setRecipe(list);
  };

  const handleMethodsInput = (index: number, e: any) => {
    const { name, value } = e.target;
    const list = [...recipe.methods];
    list[index][name] = value;
    setRecipe({ ...recipe, methods: list });
  };

  const handleAddMethod = () => {
    setRecipe({ ...recipe, methods: [...recipe.methods, { description: '' }] });
  };

  const handleRemoveMethod = (index: number) => {
    const list = { ...recipe };
    list.methods.splice(index, 1);
    setRecipe(list);
  };

  const { isLoading, data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(recipe);
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          '& > :not(style)': { width: '100%' },
        }}
      >
        {categories && (
          <Select label="Category" labelId="demo-simple-select-label" id="categoryId" name="categoryId" value={recipe.categoryId} onChange={changeInputValue}>
            {categories.map((category: any) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        )}

        <TextField label="Title" name="title" variant="outlined" margin="normal" size="small" value={recipe.title} onChange={changeInputValue} />
        <TextField label="Image URL" name="imageUrl" variant="outlined" margin="normal" size="small" value={recipe.imageUrl} onChange={changeInputValue} />
        <TextField label="Servings" name="servings" variant="outlined" margin="normal" size="small" value={recipe.servings} onChange={changeInputValue} />
        <TextField label="Prep Time" name="prepTime" variant="outlined" margin="normal" size="small" value={recipe.prepTime} onChange={changeInputValue} />
        <TextField
          label="Cooking Time"
          name="cookingTime"
          variant="outlined"
          margin="normal"
          size="small"
          value={recipe.cookingTime}
          onChange={changeInputValue}
        />
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          margin="normal"
          size="small"
          value={recipe.description}
          onChange={changeInputValue}
        />

        {recipe.ingredients.map((ingredient: any, index: any) => (
          <div key={index}>
            <TextField
              name="name"
              label="New Ingredient"
              margin="dense"
              size="small"
              value={ingredient.name}
              onChange={(e) => handleIngredientsInput(index, e)}
            />
            <button onClick={() => handleRemoveIngredient(index)}>handleRemoveIngredient</button>
          </div>
        ))}
        <button onClick={handleAddIngredient}>add more</button>

        {recipe.methods.map((method: any, index: any) => (
          <div key={index}>
            <TextField
              name="description"
              label="New Method"
              margin="dense"
              size="small"
              value={method.description}
              onChange={(e) => handleMethodsInput(index, e)}
            />
            <button onClick={() => handleRemoveMethod(index)}>Delete method</button>
          </div>
        ))}
        <button onClick={handleAddMethod}>add more</button>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default RecipeForm;
