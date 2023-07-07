import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ErrorField = ({ children }: Props) => {
  return <span style={{ color: 'red' }}>{children}</span>;
};

export default ErrorField;
