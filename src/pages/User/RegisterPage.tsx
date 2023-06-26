import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/users';
import { UserProps } from '../../types/users';
import RegisterForm from '../../components/Forms/User/RegisterForm';

const RegisterPage = () => {
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => navigate('/'),
  });

  const handleNewUser = (user: UserProps) => {
    if (user.password === user.confirmPassword) {
      createUserMutation.mutate({
        username: user.username,
        email: user.email,
        password: user.password,
      });
    } else {
      setError('Password does not match');
      return null;
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleNewUser} />
      {error && <h1 style={{ color: 'red' }}>{error}</h1>}
    </div>
  );
};

export default RegisterPage;
