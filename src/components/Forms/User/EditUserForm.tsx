import React, { useState } from 'react';
import styles from './UserForm.module.css';
import Container from '../../Container/Container';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '../../../api/users';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserProps } from '../../../types/users';

type Props = {
  onSubmit: (user: UserProps) => void;
  initialValue: UserProps;
};

const EditUserForm = ({ onSubmit, initialValue }: Props) => {
  const [user, setUser] = useState({
    email: initialValue.email || '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string>('');

  const navigate = useNavigate();
  const { userId } = useParams();

  const handleChangeInput = (e: { target: { name: string; value: string } }) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('Your Account Was  Deleted.');
      navigate(`/`);
    },
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setError(`Your password doesn't match`);
    } else if (user.password === '') {
      setError(`Your password can't be empty`);
    } else {
      onSubmit(user as UserProps);
      setError('');
    }

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
            {error && <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>{error}</div>}

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
