import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import Button from 'react-bootstrap/Button';
import styles from './CategoriesPage.module.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CategoryForm from '../../components/Forms/Category/CategoryForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../../api/categories';
import { CategoriesProps } from '../../types/categories';

const CategoriesPage = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [editForm, setEditForm] = useState<any | null>(null);

  const {
    refetch,
    isLoading,
    data: categories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => refetch(),
  });

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => refetch(),
  });

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => refetch(),
  });

  const handleSubmit = (category: any) => {
    if (editForm) {
      updateCategoryMutation.mutate({
        id: editForm.id,
        ...category,
      });
    } else {
      createCategoryMutation.mutate({
        ...category,
      });
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Container>
        <div className={styles.item}>
          <div className={styles.linkBox}>
            <Button className={styles.linkButton} variant="outline-primary" onClick={() => [setIsCreate(!isCreate), setEditForm(null)]}>
              New Category
            </Button>
          </div>

          {isCreate && <CategoryForm onSubmit={handleSubmit} title={'New Category'} submit={'Create'} initialValue={{}} />}
          {editForm && <CategoryForm title={'Edit'} submit={'Submit'} onSubmit={handleSubmit} initialValue={editForm} />}

          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 800 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category: CategoriesProps, index: number) => (
                  <TableRow key={category.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <div className={styles.imgBox}>
                        <div className={styles.index}>{++index}</div>
                        <div className={styles.categoryImage}>
                          <img src={category.imageUrl} alt={category.name} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="left">{category.name}</TableCell>
                    <TableCell align="right">
                      <Button className="me-2" variant="outline-dark" onClick={() => [setEditForm(category), setIsCreate(false)]}>
                        Edit
                      </Button>
                      <Button variant="outline-danger" onClick={() => deleteCategoryMutation.mutate(category.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </div>
  );
};

export default CategoriesPage;
