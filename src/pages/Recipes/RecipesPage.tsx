import React from 'react';
import styles from './RecipesPage.module.css';
import Container from '../../components/Container/Container';
import RecipeItem from '../../components/RecipeItem/RecipeItem';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getRecipesByCategory } from '../../api/categories';
import { CategoryRecipesProps } from '../../types/categories';

type Props = {};

const RecipePage = (props: Props) => {
  const { categoryId } = useParams();

  const { isLoading, data: recipes } = useQuery({
    queryKey: ['categories', Number(categoryId)],
    queryFn: () => getRecipesByCategory(Number(categoryId)),
  });

  if (isLoading) return <h1>Loading...</h1>;
  console.log(recipes);

  return (
    <div>
      <Container>
        <div className={styles.itemsWrapper}>
          {recipes.recipes.map((recipe: CategoryRecipesProps) => (
            <RecipeItem key={recipe.id} {...recipe} category={recipes.name} />
          ))}
          {/* <div className={styles.item}>
            <div className={styles.imgBox}>
              <img src="https://www.countdown.co.nz/Content/Recipes/219268_Winter%20Recipes%20Tiles_Tomato_Chickpea_Soup_810x520.jpg" alt="" />
            </div>
            <div className={styles.itemContent}>
              <div className={styles.category}> Dinner</div>
              <p className={styles.title}> Kazkoks troskinys</p>

              <div className={styles.innerContainer}>
                <div className={styles.additionalInfo}>
                  <div className={styles.innerTitle}>Prep & Cook Time</div>
                  <div className={styles.innerBox}>
                    <PiCookingPot className={styles.icon} /> <span className={styles.innerContent}>15 min + 30 min</span>
                  </div>
                </div>

                <div className={styles.additionalInfo}>
                  <div className={styles.innerTitle}>Servings</div>
                  <div className={styles.innerBox}>
                    <BiDish className={styles.icon} /> <span className={styles.innerContent}>6</span>
                  </div>
                </div>
              </div>

              <p className={styles.category}></p>
            </div>
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default RecipePage;
