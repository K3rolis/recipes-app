import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getCategories } from '../../../api/categories';
import { useQuery } from '@tanstack/react-query';
import styles from './Navigation.module.css';
import Container from '../../Container/Container';

type CategoryProps = {
  id: number;
  name: string;
};

const Navigation = () => {
  const {
    // status,
    isLoading,
    isError,
    error,
    data: categories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    onError: (error: any) => {
      return <h1>{`Something went wrong: ${error.message} `}</h1>;
    },
  });

  if (isLoading) return <h1>loading...</h1>;
  if (isError) return <h1>{error.message}</h1>;

  console.log(getCategories());
  return (
    <Container>
      <div className={styles.navbar}>
        <NavLink className={({ isActive }) => (isActive ? styles.active : 'active')} to="/">
          Home
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.active : 'active')} to="/recipes/">
          Recipes
        </NavLink>

        <input type="search" />

        <NavLink className={({ isActive }) => (isActive ? styles.active : 'active')} to="/categories/">
          Categories
        </NavLink>

        {/* 
      {categories &&
        categories.map((category: CategoryProps) => (
          <NavLink key={category.id} to={`/recipes/categories/${category.id}`}>
            {category.name}
          </NavLink>
        ))} */}
      </div>
    </Container>
  );
};

export default Navigation;
