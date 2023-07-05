import { useContext, useState } from 'react';
import Container from '../../components/Container/Container';
import CommentForm from '../../components/Forms/Comment/CommentForm';
import { LoginContext } from '../../components/Contexts/LoginContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createComment, deleteComment, getComments, updateComment } from '../../api/comments';
import { useParams } from 'react-router-dom';
import CommentItem from '../../components/CommentItem/CommentItem';
import { getRecipe } from '../../api/recipes';
import SingleRecipe from '../../components/SingleRecipe/SingleRecipe';
import Button from 'react-bootstrap/Button';
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { CommentProps } from '../../types/comments';

const SingleRecipePage = () => {
  const { isLoggedIn } = useContext(LoginContext);
  const { recipeId } = useParams();
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<CommentProps | null>(null);

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
    onSuccess: () => {
      refetch();
      toast.success('New comment added');
    },
    onError: () => {
      toast.error('Server issues, please try again later');
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      refetch();
      toast.success('Comment deleted');
    },
    onError: () => {
      toast.error('Server issues, please try again later');
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      refetch();
      toast.success('Comment updated');
    },
    onError: () => {
      toast.error('Server issues, please try again later');
    },
  });

  const handleNewComment = (comment: CommentProps) => {
    if (editForm) {
      updateCommentMutation.mutate({ ...comment, id: editForm.id } as CommentProps);
    } else {
      createCommentMutation.mutate(comment);
    }
    setOpenComment(false);
    setEditForm(null);
  };

  const handleEdit = (comment: CommentProps) => {
    setEditForm(comment);
    setOpenComment(false);
  };

  const handleDelete = (id: number) => {
    deleteCommentMutation.mutate(id);
  };

  if (deleteCommentMutation.isLoading || isLoading) return <PropagateLoader className="loader" color="#36d7b7" />;

  return (
    <div>
      <Container>
        <SingleRecipe {...recipe} />

        <h2>Comments {`(${comments.length})`}</h2>

        {isLoggedIn && (
          <Button style={{ margin: 8 }} onClick={() => [setOpenComment(!openComment), setEditForm(null)]}>
            New Comment
          </Button>
        )}

        {isLoggedIn && openComment && <CommentForm onSubmit={handleNewComment} initialValue={{} as CommentProps} />}
        {comments?.map((comment: CommentProps) => (
          <>
            <CommentItem props={{ ...comment }} handleEdit={handleEdit} handleDelete={handleDelete} />
            {console.log({ ...comment })}
            {isLoggedIn && editForm?.id === comment.id && <CommentForm onSubmit={handleNewComment} initialValue={editForm as CommentProps} />}
          </>
        ))}
      </Container>
    </div>
  );
};

export default SingleRecipePage;
