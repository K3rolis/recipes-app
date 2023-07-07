import * as yup from 'yup';

export const userSchema = yup.object().shape({
  username: yup.string().required().min(2),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});
