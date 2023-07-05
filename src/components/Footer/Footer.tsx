import React from 'react';
import styles from './Footer.module.css';
import Container from '../Container/Container';

import { BsGithub } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';

const Footer = () => {
  return (
    <div>
      <Container>
        <div className={styles.logoBox}>
          <a href="https://github.com/K3rolis/recipes-app" target="_blank" rel="noopener noreferrer">
            <BsGithub className={styles.logo} />
          </a>

          <a href="https://www.linkedin.com/in/k3rolis/" target="_blank" rel="noopener noreferrer">
            <BsLinkedin className={styles.logo} />
          </a>
        </div>

        <div className={styles.footerText}>© 2023 Kerolis. All rights reserved.</div>
      </Container>
    </div>
  );
};

export default Footer;
