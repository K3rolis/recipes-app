import React, { useState } from 'react';
import styles from './UserForm.module.css';
import Container from '../../Container/Container';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '../../../api/users';
import { useParams } from 'react-router-dom';

const EditUserForm = ({ onSubmit, initialValue }: any) => {
  const [user, setUser] = useState<any>({
    email: initialValue.email || '',
    password: '',
    confirmPassword: '',
  });
  const { userId } = useParams();

  const handleChangeInput = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    onSubmit(user);

    setUser({
      email: user.email,
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div>
      <Container className={styles.register}>
        <div className={styles.title}>Edit My Profile</div>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              '& > :not(style)': { width: '100%' },
            }}
          >
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

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>

        <Button
          style={{ marginTop: '10px' }}
          variant="danger"
          onClick={() => {
            if (window.confirm('Delete User?')) {
              deleteUserMutation.mutate(Number(userId));
            }
          }}
        >
          DELETE USER
        </Button>
      </Container>
    </div>
  );
};

export default EditUserForm;
