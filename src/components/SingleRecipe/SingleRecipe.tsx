import React from 'react';
import styles from './SingleRecipe.module.css';
import { LuClock5 } from 'react-icons/lu';
import { BiDish } from 'react-icons/bi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { deleteRecipe } from '../../api/recipes';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { PropagateLoader } from 'react-spinners';

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
  ingredients: IngredientProps[];
  methods: MethodProps[];
  category: {
    name: string;
  };
};

type MethodProps = {
  description: string;
};

type IngredientProps = {
  name: string;
};

const SingleRecipe = (props: Props) => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const deleteRecipeMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      toast.success('Recipe was deleted.');
      navigate(`/recipes`);
    },
    onError: () => {
      navigate(`/recipes/category/${categoryId}`);
      toast.success('Recipe was deleted.');
    },
  });

  if (deleteRecipeMutation.isLoading) return <PropagateLoader className="loader" color="#36d7b7" />;

  return (
    <div className={styles.recipeContainer}>
      <div className={styles.buttons}>
        <Link to={`/recipes/edit/${props.id}`}>
          <Button variant="outline-dark">Edit</Button>
        </Link>
        <Button variant="danger" onClick={() => deleteRecipeMutation.mutate(Number(props.id))}>
          Delete
        </Button>
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
              props.ingredients.map((ingredient: IngredientProps, index: number) => (
                <li key={index} className={styles.recipeIngredient}>
                  {ingredient.name}
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.methods}>
          <div className={styles.instructionsTitle}>Instructions</div>
          <div className={styles.instructions}>
            <ol>
              {props.methods &&
                props.methods.map((method: MethodProps, index: number) => (
                  <li key={index} className={styles.method}>
                    {method.description}
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
