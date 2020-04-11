import * as Yup from 'yup';

export default async (req, res, next) => {

  try {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      product: Yup.string().required('A descrição do produto é obrigatório!'),
      observation: Yup.string(),
      person: Yup.object().shape({
        deliveryman_id: Yup.number().required('O entregador é obrigatório!'),
        recipient_id: Yup.number().required('O cliente é obrigatório!'),
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
