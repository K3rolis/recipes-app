import * as yup from 'yup';

export const categorySchema = yup.object().shape({
  name: yup.string().required().min(2),
  imageUrl: yup.string().required(),
});
