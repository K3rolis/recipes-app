import React, { useContext } from 'react';
import Container from '../../components/Container/Container';
import styles from './CategoryPage.module.css';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../api/categories';
import RecipeCategoryItem from '../../components/CategoryItem/CategoryItem';
import { CategoriesProps } from '../../types/categories';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { LoginContext } from '../../components/Contexts/LoginContext';

const RecipesPage = () => {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const { auth } = useContext(LoginContext);

  return (
    <div>
      <Container>
        <div className={styles.sectionTitle}>Explore</div>
        <div style={{ textAlign: 'right', margin: 2 }}>
          {auth.isLoggedIn && (
            <Link to="/recipes/create/">
              <Button variant="outline-secondary">New Recipe</Button>
            </Link>
          )}
        </div>

        <div className={styles.categoriesWrapper}>
          {categories && categories.map((category: CategoriesProps) => <RecipeCategoryItem key={category.id} {...category} />)}
        </div>
      </Container>
    </div>
  );
};

export default RecipesPage;
