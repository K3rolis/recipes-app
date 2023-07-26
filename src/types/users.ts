export type UserProps = {
  id?: number | null;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type UserLoginProps = {
  id?: number | null;
  username: string;
  password: string;
};
