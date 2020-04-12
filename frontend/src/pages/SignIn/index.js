import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import logo from '~/assets/fastfeet-logo.png';
import Input from '~/components/Form/Input';
import Loading from '~/components/Loading';
import { signInRequest } from '~/store/modules/auth/actions';
import { ContatinerLoding } from '~/styles/components';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(1, 'No mínimo 1 caracter')
    .required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Fastfeet" />

      {loading && (
        <ContatinerLoding loading={loading.toString()}>
          <Loading />
        </ContatinerLoding>
      )}

      <Form schema={schema} onSubmit={handleSubmit}>
        <label>SEU E-MAIL</label>
        <Input name="email" type="email" placeholder="exemplo@email.com" />

        <label>SEU E-MAIL</label>
        <Input name="password" type="password" placeholder="**********" />

        <button type="submit">
          {loading ? 'Carregando ...' : 'Entra no sistema'}
        </button>
      </Form>
    </>
  );
}
