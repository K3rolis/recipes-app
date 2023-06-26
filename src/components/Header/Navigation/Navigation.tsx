import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import Container from '../../Container/Container';
import { LoginContext } from '../../Contexts/LoginContext';

const Navigation = () => {
  const { isLoggedIn, setIsLoggedIn, authUser } = useContext(LoginContext);

  console.log(isLoggedIn);

  const handleLogout = () => {
    setIsLoggedIn(false);
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

        {!isLoggedIn ? (
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
              Sveiki, {authUser.name} <button onClick={handleLogout}>Atsijungti</button>
              <NavLink className={({ isActive }) => (isActive ? styles.active : 'active')} to={`/user/edit/${authUser.id}`}>
                Edit
              </NavLink>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default Navigation;
