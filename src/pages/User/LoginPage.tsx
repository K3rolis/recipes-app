import React, { useContext, useState } from 'react';
import LoginForm from '../../components/Forms/User/Loginform';
import { LoginContext } from '../../components/Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const auth = useContext(LoginContext);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (users: any, user: any) => {
    const loggedUser = users.find(
      (element: any) => element.username.toLowerCase() === user.username.toLowerCase() && element.password.toLowerCase() === user.password.toLowerCase()
    );

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
      {error && <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>{error}</div>}
    </div>
  );
};

export default LoginPage;
