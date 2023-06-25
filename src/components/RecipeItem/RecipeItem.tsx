import React from 'react';
import styles from './RecipeItem.module.css';
import { PiCookingPot } from 'react-icons/pi';
import { BiDish } from 'react-icons/bi';
import { CategoryRecipesProps } from '../../types/categories';
import { Link } from 'react-router-dom';

const RecipeItem = (props: CategoryRecipesProps) => {
  return (
    <Link to={`/recipes/category/${props.categoryId}/recipe/${props.id}`}>
      <div className={styles.item}>
        <div className={styles.imgBox}>
          <img src={props.imageUrl} alt={props.title} />
        </div>
        <div className={styles.itemContent}>
          <div className={styles.category}> {props.categoryName} </div>
          <p className={styles.title}> {props.title}</p>

          <div className={styles.innerContainer}>
            <div className={styles.additionalInfo}>
              <div className={styles.innerTitle}>Prep & Cook Time</div>
              <div className={styles.innerBox}>
                <PiCookingPot className={styles.icon} />
                <span className={styles.innerContent}>
                  {props.prepTime} min + {props.cookingTime} min
                </span>
              </div>
            </div>

            <div className={styles.additionalInfo}>
              <div className={styles.innerTitle}>Servings</div>
              <div className={styles.innerBox}>
                <BiDish className={styles.icon} /> <span className={styles.innerContent}>{props.servings}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeItem;
