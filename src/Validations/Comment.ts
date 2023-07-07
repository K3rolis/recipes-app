import * as yup from 'yup';

export const CommentSchema = yup.object().shape({
  description: yup.string().required(),
});
