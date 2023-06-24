import React from 'react';
import styles from './RecipeItem.module.css';
import { PiCookingPot } from 'react-icons/pi';
import { BiDish } from 'react-icons/bi';
import { CategoryRecipesProps } from '../../types/categories';

const RecipeItem = (props: CategoryRecipesProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.imgBox}>
        <img src={props.imageUrl} alt={props.title} />
      </div>
      <div className={styles.itemContent}>
        <div className={styles.category}> {props.category} </div>
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
  );
};

export default RecipeItem;
