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
import { getRecipe } from '../../api/recipes';
import SingleRecipe from '../../components/SingleRecipe/SingleRecipe';

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

  const { data: recipe } = useQuery({
    queryKey: ['recipe', Number(recipeId)],
    queryFn: () => getRecipe(Number(recipeId)),
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
        <SingleRecipe {...recipe} />

        <h2>Comments {`(${comments.length})`}</h2>

        {isLoggedIn && <button onClick={() => setOpenComment(!openComment)}>New Comment</button>}

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
