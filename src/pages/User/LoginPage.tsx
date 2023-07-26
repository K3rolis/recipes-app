import React, { useContext, useState } from 'react';
import LoginForm from '../../components/Forms/User/Loginform';
import { LoginContext } from '../../components/Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import { UserLoginProps, UserProps } from '../../types/users';

const LoginPage = () => {
  const { setAuth } = useContext(LoginContext);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (users: UserProps[], user: UserLoginProps) => {
    const loggedUser = users.find((element: UserProps) => element.username.toLowerCase() === user.username.toLowerCase() && element.password === user.password);

    if (loggedUser) {
      setAuth({
        username: loggedUser.username,
        isLoggedIn: true,
        id: loggedUser.id!,
      });
      navigate('/');
    } else {
      setError('Wrong Username or Password');
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
      {error && <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>{error}</div>}
    </div>
  );
};

export default LoginPage;
