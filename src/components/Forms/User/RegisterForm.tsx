import React, { useState } from 'react';
import styles from './UserForm.module.css';
import Container from '../../Container/Container';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const RegisterForm = ({ onSubmit }: any) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChangeInput = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSubmit(user);

    setUser({
      username: user.username,
      email: user.email,
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div>
      <Container className={styles.register}>
        <h1>REGISTER FORM</h1>
        <form onSubmit={handleNewUser}>
          <Box
            sx={{
              '& > :not(style)': { width: '100%' },
            }}
          >
            <TextField name="username" label="Username" variant="outlined" margin="normal" size="small" value={user.username} onChange={handleChangeInput} />
            <TextField name="email" label="Email" variant="outlined" margin="normal" size="small" value={user.email} onChange={handleChangeInput} />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              margin="normal"
              size="small"
              type="password"
              value={user.password}
              onChange={handleChangeInput}
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              size="small"
              type="password"
              value={user.confirmPassword}
              onChange={handleChangeInput}
            />

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default RegisterForm;
