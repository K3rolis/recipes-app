import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type Props = {};

const CommentForm = (props: Props) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '100%' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField id="outlined-basic" label="Full Name" variant="outlined" margin="dense" size="small" />
      <TextField id="outlined-basic" label="Title" variant="outlined" margin="dense" size="small" />
      <TextField id="outlined-multiline-static" label="Comment" multiline maxRows={4} placeholder="Comment..." />
      <Button variant="contained">Create</Button>
    </Box>
  );
};

export default CommentForm;
