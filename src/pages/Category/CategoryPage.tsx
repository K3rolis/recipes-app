import React from 'react';
import Container from '../../components/Container/Container';
import styles from './CategoryPage.module.css';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../api/categories';
import RecipeCategoryItem from '../../components/CategoryItem/CategoryItem';
import { CategoriesProps } from '../../types/categories';

const RecipesPage = () => {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <div>
      <Container>
        Labas
        <div className={styles.categoriesWrapper}>
          {categories && categories.map((category: CategoriesProps) => <RecipeCategoryItem key={category.id} {...category} />)}
        </div>
      </Container>
    </div>
  );
};

export default RecipesPage;
