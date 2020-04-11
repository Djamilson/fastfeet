import * as Yup from 'yup';

export default async (req, res, next) => {

  try {
    const schema = Yup.object().shape({
      person: Yup.object({
        name: Yup.string().required('O nome é obrigatório!'),
        email: Yup.string()
          .email('Insira um e-mail válido!')
          .required('O e-mail é obrigatório!'),
        phone: Yup.object({
          prefix: Yup.string().required('O prefixo é obrigatório!'),
          number: Yup.string().required('O número é obrigatório!'),
        }),
      }).required(),

      address: Yup.object()
        .shape({
          street: Yup.string().required('A rua é obrigatória!'),
          number: Yup.string().required('O número é obrigatório!'),
          complement: Yup.string(),
          zip_code: Yup.string().required('A rua é obrigatória!'),
          district: Yup.string().required('Bairro é obrigatório!'),
          city: Yup.object({
            city: Yup.number().required('A cidade é obrigatória!'),
            state: Yup.number().required(),
          }),
        })
        .required(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
