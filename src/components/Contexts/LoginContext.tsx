import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

// export const LoginContext = createContext<any>({});

export type Auth = {
  username: string;
  isLoggedIn: boolean;
  id: number | null;
};

export interface LoginContextInterface {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
}

type LoginProviderProps = {
  children: ReactNode;
};

export const LoginContext = createContext<LoginContextInterface>({} as LoginContextInterface);

export const LoginContextProvider = ({ children }: LoginProviderProps) => {
  const [auth, setAuth] = useState<Auth>({
    id: null,
    username: '',
    isLoggedIn: false,
  });
  return <LoginContext.Provider value={{ auth, setAuth }}>{children}</LoginContext.Provider>;
};
