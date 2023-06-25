import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type Props = {};

const RecipeForm = (props: Props) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '100%' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField id="outlined-basic" label="User" variant="outlined" margin="normal" size="small" />
      <TextField id="outlined-basic" label="Category" variant="outlined" margin="normal" size="small" />
      <TextField id="outlined-basic" label="Title" variant="outlined" margin="normal" size="small" />
      <TextField id="outlined-basic" label="Image URL" variant="outlined" margin="normal" size="small" />
      <TextField id="outlined-basic" label="Servings" variant="outlined" margin="normal" size="small" />
      <TextField id="outlined-basic" label="Prep Time" variant="outlined" margin="normal" size="small" />
      <TextField id="outlined-basic" label="Cooking Time" variant="outlined" margin="normal" size="small" />
      <TextField id="outlined-basic" label="Description" variant="outlined" margin="normal" size="small" />

      <TextField name="ingredients" label="New Ingredient" margin="dense" size="small" />
      <TextField name="ingredients" label="New Ingredient" margin="dense" size="small" />
      <TextField name="ingredients" label="New Ingredient" margin="dense" size="small" />
      <TextField name="ingredients" label="New Ingredient" margin="dense" size="small" />

      <TextField name="methods" label="New Method" margin="dense" size="small" />
      <TextField name="methods" label="New Method" margin="dense" size="small" />
      <TextField name="methods" label="New Method" margin="dense" size="small" />
      <TextField name="methods" label="New Method" margin="dense" size="small" />

      <Button variant="contained">Submit</Button>
    </Box>
  );
};

export default RecipeForm;
