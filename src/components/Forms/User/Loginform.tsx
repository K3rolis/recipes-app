import React from 'react';
import styles from './UserForm.module.css';
import Container from '../../Container/Container';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginForm = () => {
  return (
    <div>
      <Container className={styles.register}>
        <h1>LOGIN FORM</h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { width: '100%' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <TextField className={styles.input} id="outlined-basic" label="Email" variant="outlined" margin="normal" size="small" />
          <TextField className={styles.input} id="outlined-basic" label="Password" variant="outlined" margin="normal" size="small" />

          <Button variant="contained">Contained</Button>
        </Box>
      </Container>
    </div>
  );
};

export default LoginForm;
