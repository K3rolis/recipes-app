import React from 'react';
import Container from '../../components/Container/Container';
import styles from './RegisterPage.module.css';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const RegisterPage = () => {
  return (
    <div>
      <Container className={styles.register}>
        <h1>REGISTER FORM</h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { width: '100%' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <TextField className={styles.input} id="outlined-basic" label="Username" variant="outlined" margin="normal" size="small" />
          <TextField className={styles.input} id="outlined-basic" label="Email" variant="outlined" margin="normal" size="small" />
          <TextField className={styles.input} id="outlined-basic" label="Password" variant="outlined" margin="normal" size="small" />
          <TextField className={styles.input} id="outlined-basic" label="Confirm Password" variant="outlined" margin="normal" size="small" />

          <Button variant="contained">Contained</Button>
        </Box>
      </Container>
    </div>
  );
};

export default RegisterPage;
