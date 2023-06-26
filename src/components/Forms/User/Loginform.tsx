import React, { useState } from 'react';
import styles from './UserForm.module.css';
import Container from '../../Container/Container';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../../api/users';

const LoginForm = ({ onSubmit }: any) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const { isLoading, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) return <h1>Loading...</h1>;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(users, user);
  };

  const handleChangeInput = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Container className={styles.register}>
        <h1>LOGIN FORM</h1>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              '& > :not(style)': { width: '100%' },
            }}
          >
            <TextField
              id="username"
              name="username"
              label="Email"
              variant="outlined"
              margin="normal"
              size="small"
              value={user.username}
              onChange={handleChangeInput}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              margin="normal"
              size="small"
              value={user.password}
              onChange={handleChangeInput}
            />

            <Button variant="contained" type="submit">
              Login
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default LoginForm;
