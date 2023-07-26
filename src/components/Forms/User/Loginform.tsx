import React, { useState } from 'react';
import styles from './UserForm.module.css';
import Container from '../../Container/Container';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../../api/users';
import { PropagateLoader } from 'react-spinners';
import { UserLoginProps, UserProps } from '../../../types/users';

type Props = {
  onSubmit: (users: UserProps[], user: UserLoginProps) => void;
};

const LoginForm = ({ onSubmit }: Props) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const { isLoading, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) return <PropagateLoader className="loader" color="#36d7b7" />;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSubmit(users, user);
  };

  const handleChangeInput = (e: { target: { name: string; value: string } }) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Container className={styles.register}>
        <div className={styles.title}>LOGIN FORM</div>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              '& > :not(style)': { width: '100%' },
            }}
          >
            <TextField
              id="username"
              name="username"
              label="Username"
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
              type="password"
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
