import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/users';
import { UserProps } from '../../types/users';
import RegisterForm from '../../components/Forms/User/RegisterForm';
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('User was created!');
      navigate('/');
    },
    onError: () => navigate(`/notFound`),
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

  if (createUserMutation.isLoading) return <PropagateLoader className="loader" color="#36d7b7" />;

  return (
    <div>
      <RegisterForm onSubmit={handleNewUser} />
      {error && <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>{error}</div>}
    </div>
  );
};

export default RegisterPage;
