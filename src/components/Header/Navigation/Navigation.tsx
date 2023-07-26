import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import Container from '../../Container/Container';
import { LoginContext } from '../../Contexts/LoginContext';
import Dropdown from 'react-bootstrap/Dropdown';

const Navigation = () => {
  const { auth, setAuth } = useContext(LoginContext);

  const handleLogout = () => {
    setAuth({
      isLoggedIn: false,
      username: '',
      id: null,
    });
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
            {auth.isLoggedIn ? `Sveiki, ${auth.username}` : 'Login / Register'}
          </Dropdown.Toggle>
          {!auth.isLoggedIn ? (
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
                <NavLink className={({ isActive }) => (isActive ? styles.active : 'active')} to={`/user/edit/${auth.id}`}>
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
