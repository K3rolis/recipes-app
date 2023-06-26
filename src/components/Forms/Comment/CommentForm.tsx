import React, { useContext, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LoginContext } from '../../Contexts/LoginContext';
import { useParams } from 'react-router-dom';

const CommentForm = ({ onSubmit, initialValue }: any) => {
  const { authUser } = useContext(LoginContext);
  const today = new Date();
  const date = (today: Date) => {
    return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  };

  const { recipeId } = useParams();

  const [comment, setComment] = useState({
    userId: authUser.id,
    description: initialValue.description || '',
    postedDate: date(today),
    recipeId: Number(recipeId),
  });

  const changeInputValue = (e: any) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(comment);

    setComment({
      ...comment,
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          '& > :not(style)': { width: '100%', margin: 1 },
        }}
      >
        <TextField
          id="body"
          name="description"
          value={comment.description}
          onChange={changeInputValue}
          label="Comment"
          multiline
          minRows={3}
          maxRows={10}
          placeholder="Comment..."
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default CommentForm;
