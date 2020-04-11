import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      number: Yup.string().required(),
      street: Yup.string().required(),
      complement: Yup.string().required(),
      zip_code: Yup.string()
        .required()
        .max(10),
      district: Yup.string().required(),
      city_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
