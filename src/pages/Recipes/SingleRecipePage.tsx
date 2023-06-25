import { useContext, useState } from 'react';
import styles from './SingleRecipePage.module.css';
import Container from '../../components/Container/Container';
import { LuClock5 } from 'react-icons/lu';
import { BiDish } from 'react-icons/bi';
import CommentForm from '../../components/Forms/Comment/CommentForm';
import { LoginContext } from '../../components/Contexts/LoginContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createComment, deleteComment, getComments, updateComment } from '../../api/comments';
import { useParams } from 'react-router-dom';
import CommentItem from '../../components/CommentItem/CommentItem';

const SingleRecipePage = () => {
  const { isLoggedIn, authUser } = useContext(LoginContext);
  const { recipeId } = useParams();
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<any | null>(null);

  const {
    refetch,
    isLoading,
    data: comments,
  } = useQuery({
    queryKey: ['comments', Number(recipeId)],
    queryFn: () => getComments(Number(recipeId)),
  });

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => refetch(),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => refetch(),
  });

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => refetch(),
  });

  const handleNewComment = (comment: any) => {
    if (editForm) {
      updateCommentMutation.mutate({ id: editForm.id, ...comment });
    } else {
      createCommentMutation.mutate(comment);
    }
    setOpenComment(false);
    setEditForm(null);
  };

  const handleEdit = (comment: any) => {
    setEditForm(comment);
  };

  const handleDelete = (id: any) => {
    deleteCommentMutation.mutate(id);
  };

  if (isLoading) return <h1>Loading...</h1>;

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

        <h2>Comments {`(${comments.length})`}</h2>

        {isLoggedIn && (
          <button
            onClick={() => {
              setOpenComment(!openComment);
            }}
          >
            New Comment
          </button>
        )}

        {isLoggedIn && openComment && <CommentForm onSubmit={handleNewComment} initialValue={{}} />}
        {comments?.map((comment: any) => (
          <>
            <CommentItem
              {...comment}
              userName={comment.user.username}
              showActions={comment.userId === authUser.id || false}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            {isLoggedIn && editForm?.id === comment.id && <CommentForm onSubmit={handleNewComment} initialValue={editForm} />}
          </>
        ))}
      </Container>
    </div>
  );
};

export default SingleRecipePage;
