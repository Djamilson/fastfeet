import * as Yup from 'yup';

export default async (req, res, next) => {

  try {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.object({
        phone_id: Yup.string().required(),
        prefix: Yup.string().required(),
        number: Yup.string().required(),
      }),
    });

    await schema.validate(req.body.data, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
