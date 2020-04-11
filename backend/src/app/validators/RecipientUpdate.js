import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      id: Yup.string(),
      person: Yup.object({
        id: Yup.string(),
        name: Yup.string().required('O nome é obrigatório!'),
        email: Yup.string()
          .email('Insira um e-mail válido!')
          .required('O e-mail é obrigatório!'),
        phone: Yup.object({
          id: Yup.string(),
          prefix: Yup.string().required(),
          number: Yup.string().required(),
        }),
      }),
      address: Yup.object({
        id: Yup.string(),
        number: Yup.string().required(),
        street: Yup.string().required(),
        complement: Yup.string().required(),
        zip_code: Yup.string().required(),
        district: Yup.string().required(),
        city: Yup.object({
          city: Yup.string().required(),
          state: Yup.string().required(),
        }),
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
