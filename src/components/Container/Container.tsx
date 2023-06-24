import styles from './Container.module.css';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};

export default Container;
