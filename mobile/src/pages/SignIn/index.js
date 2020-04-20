import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import logo from '~/assets/fastfeet-logo.png';
import Background from '~/components/Background';
import {signInRequest} from '~/store/modules/auth/actions';

import {Container, Form, FormInput, SubmitButton, LogoImg} from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const password_Ref = useRef();
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    dispatch(signInRequest(password));
  }

  return (
    <Background>
      <Container>
        <LogoImg source={logo} />
        <Form>
          <FormInput
            icon="https"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Informe seu ID de cadastro"
            ref={password_Ref}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
