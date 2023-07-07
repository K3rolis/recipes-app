import * as yup from 'yup';

export const RecipeSchema = yup.object().shape({
  categoryId: yup.number().integer().required('Please select a category').typeError('Please select a category'),
  title: yup.string().required(),
  imageUrl: yup.string().required(),
  servings: yup.number().integer().positive().required().typeError('Only positive numbers acceptable'),
  prepTime: yup.number().integer().positive().required().typeError('Only positive numbers acceptable'),
  cookingTime: yup.number().integer().positive().required().typeError('Only positive numbers acceptable'),
  description: yup.string().required(),
  ingredients: yup.array().of(
    yup.object().shape({
      name: yup.string().required('This field can not be empty'),
    })
  ),

  methods: yup.array(
    yup.object().shape({
      description: yup.string().required('This field can not be empty'),
    })
  ),
});
