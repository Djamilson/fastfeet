import * as Yup from 'yup';

export default async (req, res, next) => {
  const {
    id,
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

    id_file,
  } = req.body;

  const data = {
    id,
    name,
    email,
    id_file,
    phone: { prefix, number: numberPhone },
    address: {
      street,
      number,
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
      id: Yup.string().required(),
      name: Yup.string().required(),
      id_file: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.object({
        prefix: Yup.string().required(),
        number: Yup.string().required(),
      }),
      address: Yup.object()
        .shape({
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
