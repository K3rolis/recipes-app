import React, { useState } from 'react';
import styles from './UserForm.module.css';
import Container from '../../Container/Container';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { UserProps } from '../../../types/users';
import { userSchema } from '../../../Validations/User';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorField from '../../Errors/ErrorField';

type props = {
  onSubmit: (user: UserProps) => void;
};

const RegisterForm = ({ onSubmit }: props) => {
  const [user, setUser] = useState<UserProps>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChangeInput = (e: { target: { name: string; value: string } }) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const onCreateUser = async () => {
    const isValid = await userSchema.isValid(user);

    if (isValid) {
      onSubmit(user);

      setUser({
        username: user.username,
        email: user.email,
        password: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <div>
      <Container className={styles.register}>
        <h1>REGISTER FORM</h1>
        <form onSubmit={handleSubmit(onCreateUser)}>
          <Box
            sx={{
              '& > :not(style)': { width: '100%' },
            }}
          >
            <TextField
              {...register('username')}
              label="Username"
              variant="outlined"
              margin="dense"
              size="small"
              value={user.username}
              onChange={handleChangeInput}
            />
            {errors.username && <ErrorField>{errors.username?.message}</ErrorField>}

            <TextField {...register('email')} label="Email" variant="outlined" margin="dense" size="small" value={user.email} onChange={handleChangeInput} />
            {errors.email && <ErrorField>{errors.email?.message}</ErrorField>}
            <TextField
              id="password"
              {...register('password')}
              name="password"
              label="Password"
              variant="outlined"
              margin="dense"
              size="small"
              type="password"
              value={user.password}
              onChange={handleChangeInput}
            />
            {errors.password && <ErrorField>{errors.password?.message}</ErrorField>}
            <TextField
              id="confirmPassword"
              {...register('confirmPassword')}
              label="Confirm Password"
              variant="outlined"
              margin="dense"
              size="small"
              type="password"
              value={user.confirmPassword}
              onChange={handleChangeInput}
            />
            {errors.confirmPassword && <ErrorField>{errors.confirmPassword?.message}</ErrorField>}

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
