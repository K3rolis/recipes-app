import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LoginContext } from '../../Contexts/LoginContext';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../../api/categories';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { RecipeProps } from '../../../types/recipes';
import Container from '../../Container/Container';
import { FormControl, Grid, InputLabel } from '@mui/material';
import styles from './RecipeForm.module.css';
import { PropagateLoader } from 'react-spinners';
import { CategoriesProps } from '../../../types/categories';

type Props = {
  onSubmit: (recipe: RecipeProps) => void;
  initialValue: RecipeProps;
};

type MethodProps = {
  description: string;
};

type IngredientProps = {
  name: string;
};

const RecipeForm = ({ onSubmit, initialValue }: Props) => {
  const { authUser } = useContext(LoginContext);
  const [recipe, setRecipe] = useState<RecipeProps>({
    userId: authUser.id,
    categoryId: initialValue.categoryId || '',
    title: initialValue.title || '',
    imageUrl: initialValue.imageUrl || '',
    servings: initialValue.servings || Number(0),
    prepTime: initialValue.prepTime || Number(0),
    cookingTime: initialValue.cookingTime || Number(0),
    description: initialValue.description || '',
    ingredients: initialValue.ingredients || [{ name: '' }, { name: '' }, { name: '' }],
    methods: initialValue.methods || [{ description: '' }, { description: '' }, { description: '' }, { description: '' }],
  });

  const changeInputValue = (e: { target: { name: string; value: string } }) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleIngredientsInput = (index: number, e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    const list = [...recipe.ingredients];
    list[index][name] = value;
    console.log(list);

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

  const handleMethodsInput = (index: number, e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    const list = [...recipe.methods];
    list[index][name] = value;

    console.log(list);
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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSubmit(recipe);
  };

  if (isLoading) return <PropagateLoader className="loader" color="#36d7b7" />;

  return (
    <Container className={styles.formContainer}>
      <FormControl fullWidth>
        <form onSubmit={handleSubmit}>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {categories && (
                  <FormControl fullWidth>
                    <InputLabel id="categories">Category</InputLabel>
                    <Select
                      label="Category"
                      labelId="categories"
                      id="categoryId"
                      name="categoryId"
                      size="medium"
                      margin="dense"
                      value={recipe.categoryId}
                      onChange={changeInputValue}
                      fullWidth
                    >
                      {categories.map((category: CategoriesProps) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={recipe.title}
                  onChange={changeInputValue}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="imageUrl"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={recipe.imageUrl}
                  onChange={changeInputValue}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Servings"
                  name="servings"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={recipe.servings}
                  onChange={changeInputValue}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Prep Time"
                  name="prepTime"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={recipe.prepTime}
                  onChange={changeInputValue}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Cooking Time"
                  name="cookingTime"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={recipe.cookingTime}
                  onChange={changeInputValue}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  multiline
                  maxRows={4}
                  minRows={2}
                  value={recipe.description}
                  onChange={changeInputValue}
                />
              </Grid>
              <Button variant="contained" onClick={handleAddIngredient}>
                Add Ingredient
              </Button>
              <div className={styles.ingredientsBox}>
                {recipe.ingredients.map((ingredient: IngredientProps, index: number) => (
                  <Grid item xs={12} sm={5} md={3} lg={3} margin={1}>
                    <div key={index}>
                      <TextField
                        fullWidth
                        name="name"
                        label="New Ingredient"
                        margin="dense"
                        size="small"
                        value={ingredient.name}
                        onChange={(e) => handleIngredientsInput(index, e)}
                      />
                      <Button onClick={() => handleRemoveIngredient(index)}>Remove Ingredient</Button>
                    </div>
                  </Grid>
                ))}
              </div>

              <Button variant="contained" onClick={handleAddMethod}>
                Add method
              </Button>

              <div className={styles.ingredientsBox}>
                {recipe.methods.map((method: MethodProps, index: number) => (
                  <Grid item xs={12} sm={12} margin={2}>
                    <div key={index}>
                      <TextField
                        fullWidth
                        name="description"
                        label="New Method"
                        margin="dense"
                        size="small"
                        multiline
                        minRows={3}
                        maxRows={8}
                        value={method.description}
                        onChange={(e) => handleMethodsInput(index, e)}
                      />
                      <Button onClick={() => handleRemoveMethod(index)}>Delete step</Button>
                    </div>
                  </Grid>
                ))}
              </div>

              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Box>
        </form>
      </FormControl>
    </Container>
  );
};

export default RecipeForm;
