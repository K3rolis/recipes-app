import React, { useContext, useState } from 'react';
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
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { LoginContext } from '../../components/Contexts/LoginContext';

const CategoriesPage = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [editForm, setEditForm] = useState<CategoriesProps | null>(null);
  const { auth } = useContext(LoginContext);

  const {
    refetch,
    isLoading,
    data: categories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success('Category was created successfully!');
      refetch();
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success('Category was updated successfully!');
      refetch();
    },
  });

  const handleSubmit = async (category: CategoriesProps) => {
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
    setEditForm(null);
    setIsCreate(false);
  };

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => refetch(),
  });

  if (isLoading || updateCategoryMutation.isLoading || createCategoryMutation.isLoading || updateCategoryMutation.isLoading) {
    return <PropagateLoader className="loader" color="#36d7b7" />;
  }

  return (
    <div>
      <Container>
        <div className={styles.item}>
          <div className={styles.linkBox}>
            {auth.isLoggedIn && (
              <Button className={styles.linkButton} variant="outline-primary" onClick={() => [setIsCreate(!isCreate), setEditForm(null)]}>
                New Category
              </Button>
            )}
          </div>

          {isCreate && <CategoryForm onSubmit={handleSubmit} title={'New Category'} submit={'Create'} initialValue={{} as CategoriesProps} />}
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
                      <Button variant="outline-danger" onClick={() => deleteCategoryMutation.mutate(Number(category.id))}>
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
