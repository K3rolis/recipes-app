import React, { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type Props = {};

const CommentForm = (props: Props) => {
  const [comment, setComment] = useState({
    userId: '',
    description: '',
    postedDate: '',
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        component="div"
        sx={{
          '& > :not(style)': { width: '100%' },
        }}
      >
        <TextField id="username" label="Full Name" variant="outlined" margin="dense" size="small" />
        <TextField id="body" name="description" label="Comment" multiline maxRows={4} placeholder="Comment..." />
        <Button variant="contained">Create</Button>
      </Box>
    </form>
  );
};

export default CommentForm;
