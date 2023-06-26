import React from 'react';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

type Props = {};

const NotFound = (props: Props) => {
  return (
    <Container>
      <div className={styles.errorBox}>
        <div className={styles.error}>
          <h1>Page Not Found</h1>
          <p>
            Get Back to <Link to="/">HOME</Link>{' '}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
