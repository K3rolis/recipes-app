import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import Container from '../../Container/Container';
import { LoginContext } from '../../Contexts/LoginContext';

const Navigation = () => {
  const context = useContext(LoginContext);

  console.log(context.isLoggedIn);

  const handleLogout = () => {
    context.setIsLoggedIn(false);
  };

  return (
    <Container>
      <div className={styles.navbar}>
        <NavLink className={({ isActive }) => (isActive ? styles.active : 'active')} to="/">
          Home
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.active : 'active')} to="/recipes/">
          Recipes
        </NavLink>

        <NavLink className={({ isActive }) => (isActive ? styles.active : 'active')} to="/categories/">
          Categories
        </NavLink>

        {!context.isLoggedIn ? (
          <>
            <NavLink className={({ isActive }) => (isActive ? styles.active : 'active')} to="/login/">
              Login
            </NavLink>

            <NavLink className={({ isActive }) => (isActive ? styles.active : 'active')} to="/register/">
              Register
            </NavLink>
          </>
        ) : (
          <>
            <div>
              Sveiki, {context.authUser.name} <button onClick={handleLogout}>Atsijungti</button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default Navigation;
