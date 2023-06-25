import React, { useContext, useState } from 'react';
import LoginForm from '../../components/Forms/User/Loginform';
import { LoginContext } from '../../components/Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const auth = useContext(LoginContext);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  console.log(auth.authUser);

  const handleLogin = (users: any, user: any) => {
    const loggedUser = users.find((element: any) => {
      if (element.username === user.username && element.password === user.password) {
        return user;
      }
    });
    if (loggedUser) {
      auth.setAuthUser({
        name: loggedUser.username,
        id: loggedUser.id,
      });
      auth.setIsLoggedIn(true);
      navigate('/');
    } else {
      setError('Wrong Username or Password');
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
      {error && <h1>{error}</h1>}
    </div>
  );
};

export default LoginPage;
