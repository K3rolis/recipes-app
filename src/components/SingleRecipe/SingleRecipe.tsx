import React from 'react';
import styles from './SingleRecipe.module.css';
import { LuClock5 } from 'react-icons/lu';
import { BiDish } from 'react-icons/bi';
import Button from '@mui/material/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { deleteRecipe } from '../../api/recipes';

type Props = {
  id?: number;
  imageUrl: string;
  title: string;
  categoryId: number;
  userId: number;
  servings: number;
  prepTime: number;
  cookingTime: number;
  description: string;
  ingredients: any;
  methods: any;
  category: any;
};

const SingleRecipe = (props: Props) => {
  const navigate = useNavigate();
  const deleteRecipeMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => navigate(`/recipes/category/${props.id}`),
  });

  return (
    <div className={styles.recipeContainer}>
      <div className={styles.buttons}>
        <Link to={`/recipes/edit/${props.id}`}>Edit</Link>
        <Button onClick={() => deleteRecipeMutation.mutate(Number(props.id))}>Delete</Button>
      </div>

      <div className={styles.recipeBrief}>
        <div className={styles.imgBox}>
          <img src={props.imageUrl} alt={props.title} />
        </div>

        <div className={styles.content}>
          <div className={styles.title}>{props.title}</div>
          <div className={styles.metaItems}>
            <div className={styles.metaItem}>
              <BiDish className={styles.icon} />
              <span className={styles.metaItemText}>Serves: {props.servings}</span>
            </div>
            <div className={styles.metaItem}>
              <LuClock5 className={styles.icon} />
              <span className={styles.metaItemText}>Prep Time: {props.prepTime} mins </span>
              <span className={styles.metaItemText}>Cooking Time: {props.cookingTime} mins</span>
            </div>
          </div>
          <div className={styles.description}>{props.description}</div>

          <div className={styles.category}>
            <span className={styles.categoryButton}>{props.category?.name}</span>
          </div>
        </div>
      </div>
      <div className={styles.instructionsContainer}>
        <div className={styles.sidebar}>
          <div className={styles.instructionsTitle}>Ingredients</div>
          <ul>
            {props.ingredients &&
              props.ingredients.map((ingredient: any, index: number) => (
                <li key={index} className={styles.recipeIngredient}>
                  {ingredient.name}
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.methods}>
          <div className={styles.instructionsTitle}>Instructions</div>
          <div className={styles.instructions}>
            <ol>{props.methods && props.methods.map((method: any) => <li className={styles.method}>{method.description}</li>)}</ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
