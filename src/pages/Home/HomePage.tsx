import React from 'react';
import styles from './HomePage.module.css';
import Container from '../../components/Container/Container';
import { CategoryRecipesProps } from '../../types/categories';
import RecipeItem from '../../components/RecipeItem/RecipeItem';
import { useQuery } from '@tanstack/react-query';
import { getRecipes } from '../../api/recipes';

type Props = {};

const HomePage = (props: Props) => {
  const { isLoading, data: recipes } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(),
  });

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className={styles.container}>
      <div className={styles.heroBanner}>
        <Container className={styles.containerBox}>
          <div className={styles.heroBox}>
            <div className={styles.heroTitle}>Recipes of the Year </div>
            <div className={styles.heroBodyText}>We're bringing you easy meal ideas and lots of fresh recipe inspiration with our Recipe of the Year.</div>
          </div>
        </Container>
      </div>
      <Container>
        <div className={styles.sectionTitle}> Recipes of the Week </div>
        <div className={styles.itemsWrapper}>
          {recipes.map((recipe: CategoryRecipesProps) => (
            <RecipeItem key={recipe.id} {...recipe} categoryName={recipes.name} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
