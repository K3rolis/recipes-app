import React, { useContext, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LoginContext } from '../../Contexts/LoginContext';
import { useParams } from 'react-router-dom';
import { CommentProps } from '../../../types/comments';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CommentSchema } from '../../../Validations/Comment';
import ErrorField from '../../Errors/ErrorField';

type props = {
  onSubmit: (comment: CommentProps) => void;
  initialValue: CommentProps;
};

const CommentForm = ({ onSubmit, initialValue }: props) => {
  const { auth } = useContext(LoginContext);
  const today = new Date();
  const date = (today: Date) => {
    return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  };

  const { recipeId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CommentSchema) });

  const [comment, setComment] = useState({
    userId: auth.id,
    description: initialValue.description || '',
    postedDate: date(today),
    recipeId: Number(recipeId),
  });

  const changeInputValue = (e: { target: { name: string; value: string } }) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const onCreateComment = async () => {
    const isValid = await CommentSchema.isValid(comment);

    if (isValid) {
      onSubmit(comment as CommentProps);
      setComment({
        ...comment,
        description: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onCreateComment)}>
      <Box
        sx={{
          '& > :not(style)': { width: '100%', margin: 1 },
        }}
      >
        <TextField
          id="body"
          {...register('description')}
          value={comment.description}
          onChange={changeInputValue}
          label="Comment"
          multiline
          minRows={3}
          maxRows={10}
          placeholder="Comment..."
        />

        {errors.description && <ErrorField> {errors.description?.message}</ErrorField>}

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default CommentForm;
