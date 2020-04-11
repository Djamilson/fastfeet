import * as Yup from 'yup';

export default async (req, res, next) => {

  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(1),
      privacy: Yup.object({
        terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
      }),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
