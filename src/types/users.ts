export type UserProps = {
  id?: number;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type UserLoginProps = {
  id?: number;
  username: string;
  password: string;
};
