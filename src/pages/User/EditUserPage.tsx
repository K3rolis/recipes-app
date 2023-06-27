import React, { useContext, useState } from 'react';
import EditUserForm from '../../components/Forms/User/EditUserForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../api/users';
import Container from '../../components/Container/Container';
import { LoginContext } from '../../components/Contexts/LoginContext';
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-toastify';

type Props = {};

const EditUserPage = (props: Props) => {
  const { userId } = useParams();
  const { authUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const { isLoading, data: user } = useQuery({
    queryKey: ['users', Number(userId)],
    queryFn: () => getUser(Number(userId)),
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success('Successfully edited profile data');
      navigate('/');
    },
  });

  const handleSubmit = (user: any) => {
    if (user.password === user.confirmPassword) {
      updateUserMutation.mutate({
        id: Number(userId),
        username: authUser.name,
        email: user.email,
        password: user.password,
      });
    }
  };

  if (isLoading) return <PropagateLoader className="loader" color="#36d7b7" />;

  return (
    <div>
      <EditUserForm onSubmit={handleSubmit} initialValue={user} />
    </div>
  );
};

export default EditUserPage;
