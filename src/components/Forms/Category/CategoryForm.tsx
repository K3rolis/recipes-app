import React, { useState } from 'react';
import styles from './CategoryForm.module.css';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CategoriesProps } from '../../../types/categories';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { categorySchema } from '../../../Validations/Category';
import ErrorField from '../../Errors/ErrorField';

type CategoryProps = {
  onSubmit: (category: CategoriesProps) => void;
  initialValue: CategoriesProps;
  title: string;
  submit: string;
};

const CategoryForm = ({ onSubmit, initialValue, title, submit }: CategoryProps) => {
  const [category, setCategories] = useState({
    name: initialValue.name || '',
    imageUrl: initialValue.imageUrl || '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(categorySchema) });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategories({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const onCreateCategory = async (data: any) => {
    const isValid = await categorySchema.isValid(category);

    if (isValid) {
      onSubmit(data);

      setCategories({
        name: '',
        imageUrl: '',
      });
    }
  };

  // const handleSubmit = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   const isValid = await categorySchema.isValid(category);
  //   console.log(isValid);
  //   if (isValid) {
  //     onSubmit(category);

  //     setCategories({
  //       name: '',
  //       imageUrl: '',
  //     });
  //   }
  // };

  return (
    <div>
      <div className={styles.formBox}>
        <span>{title}</span>
        <form onSubmit={handleSubmit(onCreateCategory)}>
          <Box
            component="div"
            sx={{
              '& > :not(style)': { width: '100%' },
            }}
          >
            <TextField
              id="name"
              label="Category name"
              {...register('name')}
              // error
              // name="name"
              variant="outlined"
              margin="normal"
              size="small"
              value={category.name}
              onChange={handleChangeInput}
            />
            {errors.name && <ErrorField> {errors.name?.message} </ErrorField>}

            <TextField
              id="imageUrl"
              label="Image URL"
              {...register('imageUrl')}
              // error
              // name="imageUrl"
              variant="outlined"
              margin="normal"
              size="small"
              value={category.imageUrl}
              onChange={handleChangeInput}
            />
            {errors.imageUrl && <p style={{ color: 'red' }}>{errors.imageUrl?.message}</p>}

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
