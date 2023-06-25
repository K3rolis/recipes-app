import React, { ReactNode } from 'react';
import styles from './Header.module.css';
import Navigation from './Navigation/Navigation';

const Header = () => {
  return (
    <div className={styles.header}>
      <Navigation />
    </div>
  );
};

export default Header;
