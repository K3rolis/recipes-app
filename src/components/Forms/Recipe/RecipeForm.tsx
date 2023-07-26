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
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RecipeSchema } from '../../../Validations/Recipe';
import ErrorField from '../../Errors/ErrorField';

type Props = {
  onSubmit: (recipe: RecipeProps) => void;
  initialValue: RecipeProps;
};

const RecipeForm = ({ onSubmit, initialValue }: Props) => {
  const { auth } = useContext(LoginContext);
  const [recipe, setRecipe] = useState<RecipeProps>({
    userId: auth.id,
    categoryId: initialValue.categoryId || '',
    title: initialValue.title || '',
    imageUrl: initialValue.imageUrl || '',
    servings: initialValue.servings || Number(),
    prepTime: initialValue.prepTime || Number(),
    cookingTime: initialValue.cookingTime || Number(),
    description: initialValue.description || '',
    ingredients: initialValue.ingredients || [{ name: '' }],
    methods: initialValue.methods || [{ description: '' }],
  });

  const {
    control,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RecipeSchema) });

  const changeInputValue = (e: { target: { name: string; value: string } }) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove,
  } = useFieldArray({
    name: 'ingredients',
    control,
  });

  const {
    fields: methodFields,
    append: methodAppend,
    remove: methodRemove,
  } = useFieldArray({
    name: 'methods',
    control,
  });

  const { isLoading, data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const values = getValues();

  const onCreateRecipe = async () => {
    const isValid = await RecipeSchema.isValid(values);
    if (isValid) {
      onSubmit(recipe);
    }
  };

  if (isLoading) return <PropagateLoader className="loader" color="#36d7b7" />;

  return (
    <Container className={styles.formContainer}>
      <FormControl fullWidth>
        <form onSubmit={handleSubmit(onCreateRecipe)}>
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
                      {...register('categoryId')}
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
                    {errors.categoryId && <ErrorField>{errors.categoryId?.message}</ErrorField>}
                  </FormControl>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Title"
                  {...register('title')}
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={recipe.title}
                  onChange={changeInputValue}
                />
                {errors.title && <ErrorField>{errors.title?.message}</ErrorField>}
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  {...register('imageUrl')}
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={recipe.imageUrl}
                  onChange={changeInputValue}
                />
                {errors.imageUrl && <ErrorField>{errors.imageUrl?.message}</ErrorField>}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Servings"
                  {...register('servings')}
                  type="number"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={recipe.servings}
                  onChange={changeInputValue}
                />
                {errors.servings && <ErrorField>{errors.servings?.message}</ErrorField>}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Prep Time"
                  {...register('prepTime')}
                  type="number"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={recipe.prepTime}
                  onChange={changeInputValue}
                />
                {errors.prepTime && <ErrorField>{errors.prepTime?.message}</ErrorField>}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Cooking Time"
                  {...register('cookingTime')}
                  type="number"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={recipe.cookingTime}
                  onChange={changeInputValue}
                />
                {errors.cookingTime && <ErrorField>{errors.cookingTime?.message}</ErrorField>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  {...register('description')}
                  variant="outlined"
                  margin="normal"
                  size="small"
                  multiline
                  maxRows={4}
                  minRows={2}
                  value={recipe.description}
                  onChange={changeInputValue}
                />
                {errors.description && <ErrorField>{errors.description?.message}</ErrorField>}
              </Grid>

              <div className={styles.ingredientsBox}>
                {ingredientFields.map((field, index) => {
                  return (
                    <Grid item xs={12} sm={5} md={3} lg={3} margin={1} key={field.id}>
                      <TextField
                        fullWidth
                        {...register(`ingredients.${index}.name` as const)}
                        label="New Ingredient"
                        margin="dense"
                        size="small"
                        onChange={() => setRecipe({ ...recipe, ingredients: values.ingredients } as RecipeProps)}
                      />
                      {errors.ingredients && <ErrorField>{errors.ingredients[index]?.name?.message}</ErrorField>}

                      {index > 0 && (
                        <Button type="button" onClick={() => ingredientRemove(index)}>
                          remove ingredient
                        </Button>
                      )}
                    </Grid>
                  );
                })}
              </div>
              <Button type="button" variant="contained" color="secondary" style={{ marginLeft: '14px' }} onClick={() => ingredientAppend({ name: '' })}>
                Add Ingredient
              </Button>

              <div className={styles.ingredientsBox}>
                {methodFields.map((field, index) => {
                  return (
                    <Grid item xs={12} sm={12} margin={2} key={field.id}>
                      <TextField
                        fullWidth
                        {...register(`methods.${index}.description` as const)}
                        label="New Method"
                        margin="dense"
                        size="small"
                        multiline
                        minRows={3}
                        maxRows={8}
                        onChange={() => setRecipe({ ...recipe, methods: values.methods } as RecipeProps)}
                      />

                      {errors.methods && <ErrorField>{errors.methods[index]?.description?.message}</ErrorField>}

                      {index > 0 && (
                        <Button type="button" onClick={() => methodRemove(index)}>
                          remove method
                        </Button>
                      )}
                    </Grid>
                  );
                })}
              </div>
              <Button variant="contained" color="secondary" style={{ marginLeft: '14px' }} onClick={() => methodAppend({ description: '' })}>
                Add method
              </Button>
            </Grid>

            <Button variant="contained" style={{ marginTop: '20px' }} type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </FormControl>
    </Container>
  );
};

export default RecipeForm;
