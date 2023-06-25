import React, { useState } from 'react';
import styles from './CategoryForm.module.css';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type Props = {
  onSubmit: any;
  initialValue: any;
  title: string;
  submit: string;
};

const CategoryForm = ({ onSubmit, initialValue, title, submit }: Props) => {
  const [category, setCategories] = useState({
    name: initialValue.name || '',
    imageUrl: initialValue.imageUrl || '',
  });

  console.log(initialValue);

  const handleChangeInput = (e: any) => {
    setCategories({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSubmit(category);
    console.log(category);

    setCategories({
      name: '',
      imageUrl: '',
    });
  };

  return (
    <div>
      <div className={styles.formBox}>
        <span>{title}</span>
        <form onSubmit={handleSubmit}>
          <Box
            component="div"
            sx={{
              '& > :not(style)': { width: '100%' },
            }}
          >
            <TextField
              id="category"
              label="title"
              name="name"
              variant="outlined"
              margin="normal"
              size="small"
              value={category.name}
              onChange={handleChangeInput}
            />
            <TextField
              id="imageUrl"
              label="imageUrl"
              name="imageUrl"
              variant="outlined"
              margin="normal"
              size="small"
              value={category.imageUrl}
              onChange={handleChangeInput}
            />

            <Button variant="contained" type="submit">
              {submit}
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
