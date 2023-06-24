import React from 'react';
import styles from './CategoryItem.module.css';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { CategoriesProps } from '../../types/categories';
import { Link } from 'react-router-dom';

const RecipeCategoryItem = (props: CategoriesProps) => {
  return (
    <Link to={`/recipes/category/${props.id}`}>
      <div className={styles.categoryItem}>
        <img src={props.imageUrl} alt={props.name} />
        <div className={styles.contentBox}>
          <p className={styles.title}>{props.name}</p>
          <AiOutlineArrowRight className={styles.arrow} />
        </div>
      </div>
    </Link>
  );
};

export default RecipeCategoryItem;
