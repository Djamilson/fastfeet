import { toast } from 'react-toastify';

import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/_services/api';
import history from '~/_services/history';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.group_users[0].id === 3) {
      toast.error('Atenção, você deve acessar o APP!');

      yield put(signFailure());
      return;
    }

    api.defaults.headers.Authorization = ` Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/orders');
  } catch (error) {
    const str = error.toString();
    const final = str.replace(/\D/g, '');

    if (final === '400') {
      toast.warn('Não foi possível encontra um usuário, crie sua conta!');
      yield put(signFailure());
      return;
    }

    // Make sure the user has been verified
    if (final === '401') {
      toast.warn(
        'Seu email ainda não foi validado, acesse sua conta de email e confirme a validação do acesso!'
      );

      yield put(signFailure());
      return;
    }

    // Make sure the user has been verified
    if (final === '402') {
      toast.warn(
        'No momento esse usuário está desativado, entre em contato com o administrador!'
      );
      yield put(signFailure());
      return;
    }
    if (final === '403') {
      toast.error('Usuário não encontrado!');
      yield put(signFailure());
      return;
    }
    if (final === '404') {
      toast.error('Usúario ou senha incorreta, verifique seus dados!');
      yield put(signFailure());
      return;
    }

    toast.error('Não foi possível conectar, tente novamente!');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = ` Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
