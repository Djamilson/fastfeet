import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      address: Yup.object({
        number: Yup.string().required(),
        street: Yup.string().required(),
        complement: Yup.string().required(),
        zip_code: Yup.string().required().max(10),
        district: Yup.string().required(),
        city_id: Yup.string().required(),
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
