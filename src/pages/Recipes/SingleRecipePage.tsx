import React from 'react';
import styles from './SingleRecipePage.module.css';
import Container from '../../components/Container/Container';
import { LuClock5 } from 'react-icons/lu';
import { BiDish } from 'react-icons/bi';
import Button from '@mui/material/Button/Button';

type Props = {};

const SingleRecipePage = (props: Props) => {
  return (
    <div>
      <Container>
        <div className={styles.recipeBrief}>
          <div className={styles.imgBox}>
            <img src="https://www.countdown.co.nz/Content/Recipes/219268_Winter%20Recipes%20Tiles_Tomato_Chickpea_Soup_810x520.jpg" alt="" />
          </div>
          <div className={styles.content}>
            <div className={styles.title}>Cheese and thyme soda bread </div>
            <div className={styles.metaItems}>
              <div className={styles.metaItem}>
                <BiDish className={styles.icon} />
                <span className={styles.metaItemText}>Serves: 5 </span>
              </div>
              <div className={styles.metaItem}>
                <LuClock5 className={styles.icon} />
                <span className={styles.metaItemText}>Prep Time: 20 mins </span>
                <span className={styles.metaItemText}>Cooking Time: 60 mins</span>
              </div>
            </div>
            <div className={styles.description}>
              Cover this cheese and thyme soda bread in butter or dunk it in your favourite stew or soup for a wonderful time. As an Irish-style bread, it’s
              made without any yeast and is incredibly versatile.
            </div>

            <div className={styles.category}>
              <span className={styles.categoryButton}>Soup</span>
            </div>
            {/* <div className={styles.button}>Save recipe</div> */}
          </div>
        </div>

        <div className={styles.instructionsContainer}>
          <div className={styles.sidebar}>
            <div className={styles.instructionsTitle}>Ingredients</div>
            <ul>
              <li className={styles.recipeIngredient}>Labas</li>
              <li className={styles.recipeIngredient}>Labas</li>
              <li className={styles.recipeIngredient}>Labas</li>
              <li className={styles.recipeIngredient}>Labas</li>
              <li className={styles.recipeIngredient}>Labas</li>
              <li className={styles.recipeIngredient}>Labas</li>
              <li className={styles.recipeIngredient}>Labas</li>
              <li className={styles.recipeIngredient}>Labas</li>
              <li className={styles.recipeIngredient}>Labas</li>
              <li className={styles.recipeIngredient}>Labas</li>
              <li className={styles.recipeIngredient}>Labas</li>
              <li className={styles.recipeIngredient}>Labas</li>
              <li className={styles.recipeIngredient}>Labas</li>
              <li className={styles.recipeIngredient}>Labas</li>
            </ul>
          </div>
          <div className={styles.methods}>
            <div className={styles.instructionsTitle}>Instructions</div>
            <div className={styles.instructions}>
              <ol>
                <li className={styles.method}>
                  Cover this cheese and thyme soda bread in butter or dunk it in your favourite stew or soup for a wonderful time. As an Irish-style bread, it’s
                  made without any yeast and is incredibly versatile.
                </li>
                <li className={styles.method}>
                  Cover this cheese and thyme soda bread in butter or dunk it in your favourite stew or soup for a wonderful time. As an Irish-style bread, it’s
                  made without any yeast and is incredibly versatile.
                </li>
                <li className={styles.method}>
                  Cover this cheese and thyme soda bread in butter or dunk it in your favourite stew or soup for a wonderful time. As an Irish-style bread, it’s
                  made without any yeast and is incredibly versatile.
                </li>
                <li className={styles.method}>
                  Cover this cheese and thyme soda bread in butter or dunk it in your favourite stew or soup for a wonderful time. As an Irish-style bread, it’s
                  made without any yeast and is incredibly versatile.
                </li>
              </ol>
            </div>
          </div>
        </div>

        <h2>Comments</h2>
        <div className={styles.commentBox}>
          <div className={styles.commentHeader}>
            <div className={styles.metaData}>
              <div className={styles.name}>Name</div>
              <div className={styles.date}>2022-02-22</div>
            </div>
            <div className={styles.buttons}>
              <Button variant="contained">Edit</Button>
              <Button variant="outlined">Delete</Button>
            </div>
          </div>
          <div className={styles.commentBody}>
            body body body body body body body body body body body body body body body body body body body body body body body body body body body body body
            body body body body body body body body body body body body body{' '}
          </div>
          <hr />
        </div>

        <div className={styles.commentBox}>
          <div className={styles.commentHeader}>
            <div className={styles.metaData}>
              <div className={styles.name}>Name</div>
              <div className={styles.date}>2022-02-22</div>
            </div>
            <div className={styles.buttons}>
              <Button variant="contained">Edit</Button>
              <Button variant="outlined">Delete</Button>
            </div>
          </div>
          <div className={styles.commentBody}>
            body body body body body body body body body body body body body body body body body body body body body body body body body body body body body
            body body body body body body body body body body body body body{' '}
          </div>
          <hr />
        </div>

        <div className={styles.commentBox}>
          <div className={styles.commentHeader}>
            <div className={styles.metaData}>
              <div className={styles.name}>Name</div>
              <div className={styles.date}>2022-02-22</div>
            </div>
            <div className={styles.buttons}>
              <Button variant="contained">Edit</Button>
              <Button variant="outlined">Delete</Button>
            </div>
          </div>
          <div className={styles.commentBody}>
            body body body body body body body body body body body body body body body body body body body body body body body body body body body body body
            body body body body body body body body body body body body body{' '}
          </div>
          <hr />
        </div>
      </Container>
    </div>
  );
};

export default SingleRecipePage;
