import * as Yup from 'yup';

export default async (req, res, next) => {
  const {
    name,
    email,
    prefix,
    numberPhone,
    street,
    number,
    complement,
    zip_code,
    district,
    city,
    state,
  } = req.body;

  const data = {
    name,
    email,
    phone: { prefix, number: numberPhone },
    address: {
      number,
      street,
      complement,
      zip_code,
      district,
      city: {
        city: city,
        state: state,
      },
    },
  };

  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.object({
        prefix: Yup.string().required(),
        number: Yup.string().required(),
      }).required(),

      address: Yup.object()
        .shape({
          id: Yup.string(),
          street: Yup.string().required('A rua é obrigatória!'),
          number: Yup.string().required('O número é obrigatório!'),
          complement: Yup.string(),
          zip_code: Yup.string().required('A rua é obrigatória!'),
          district: Yup.string().required('Bairro é obrigatório!'),
          city: Yup.object({
            city: Yup.string().required('A cidade é obrigatória!'),
            state: Yup.string().required(),
          }),
        })
        .required(),
    });

    await schema.validate(data, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
