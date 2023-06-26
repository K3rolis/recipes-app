import React from 'react';
import styles from './RecipesPage.module.css';
import Container from '../../components/Container/Container';
import RecipeItem from '../../components/RecipeItem/RecipeItem';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getRecipesByCategory } from '../../api/categories';
import { CategoryRecipesProps } from '../../types/categories';
import { PropagateLoader } from 'react-spinners';

type Props = {};

const RecipePage = (props: Props) => {
  const { categoryId } = useParams();

  const { isLoading, data: recipes } = useQuery({
    queryKey: ['categories', Number(categoryId)],
    queryFn: () => getRecipesByCategory(Number(categoryId)),
  });

  if (isLoading) return <PropagateLoader className="loader" color="#36d7b7" />;

  return (
    <div>
      <Container>
        <div className={styles.selectionTitle}>{recipes.name}</div>
        <div className={styles.itemsWrapper}>
          {recipes.recipes.map((recipe: CategoryRecipesProps) => (
            <RecipeItem key={recipe.id} {...recipe} categoryName={recipes.name} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default RecipePage;
