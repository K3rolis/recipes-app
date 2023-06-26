import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import Container from '../../Container/Container';
import { LoginContext } from '../../Contexts/LoginContext';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

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

        <Dropdown>
          <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            {isLoggedIn ? `Sveiki, ${authUser.name}` : 'Login / Register'}
          </Dropdown.Toggle>
          {!isLoggedIn ? (
            <Dropdown.Menu>
              <NavLink className={({ isActive }) => (isActive ? styles.active : 'active')} to="/login/">
                Login
              </NavLink>
              <NavLink className={({ isActive }) => (isActive ? styles.active : 'active')} to="/register/">
                Register
              </NavLink>
            </Dropdown.Menu>
          ) : (
            <Dropdown.Menu>
              <div className={styles.greetings}>
                <div className={styles.logoutButton} onClick={handleLogout}>
                  Atsijungti
                </div>
                <NavLink className={({ isActive }) => (isActive ? styles.active : 'active')} to={`/user/edit/${authUser.id}`}>
                  Edit
                </NavLink>
              </div>
            </Dropdown.Menu>
          )}
        </Dropdown>
      </div>
    </Container>
  );
};

export default Navigation;
