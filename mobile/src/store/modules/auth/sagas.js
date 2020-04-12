import {Alert} from 'react-native';

import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '~/_services/api';

import {signInFaileru, updateProfileSuccess} from '../user/actions';
import {signFailure, signInSuccess} from './actions';

export function* signIn({payload}) {
  const {password} = payload;

  try {
    const response = yield call(api.post, `deliveryman/sessions`, {
      password,
    });

    const {token, user} = response.data;

    api.defaults.headers.Authorization = ` Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (error) {
    const str = error.toString();
    const final = str.replace(/\D/g, '');

    if (final === '400') {
      Alert.alert(
        'Erro no login',
        'Não foi possível encontra um usuário, crie sua conta!',
      );
      yield put(signFailure());
      return;
    }

    if (final === '401') {
      Alert.alert(
        'Erro no login',
        'Sua conta ainda não foi validada, acesse seu email para vê o código de ativação!',
      );

      yield put(signFailure());
      return;
    }

    if (final === '402') {
      Alert.alert(
        'Erro no login',
        'No momento esse usuário está desativado, entre em contato com o administrador!',
      );
      yield put(signFailure());
      return;
    }
    if (final === '403') {
      Alert.alert('Erro no login', 'Usuário não encontrado!');
      yield put(signFailure());
      return;
    }
    if (final === '404') {
      Alert.alert(
        'Erro no login',
        'Usúario ou senha incorreta, verifique seus dados!',
      );
      yield put(signFailure());
      return;
    }

    if (final === '429') {
      Alert.alert(
        'Erro no login',
        'Não foi possível conectar ao servidor, tente novamente!',
      );
      yield put(signFailure());
      return;
    }

    if (str === 'Error: Network Error') {
      Alert.alert(
        'Erro no login',
        'Não foi possível conectar ao servidor, tente novamente!',
      );

      yield put(signFailure());
      return;
    }

    Alert.alert('Erro no login', 'Não foi possível conectar, tente novamente!');
    yield put(signFailure());
  }
}

export function* acceptRegulationUp({payload}) {
  try {
    const {id, newPrivacy} = payload.id;

    const resp = yield call(api.put, 'accept_regulation', {
      newPrivacy,
      deliveryman_id: id,
    });

    const {user} = resp.data;

    console.log('===>>>:::', resp.data);

    yield put(updateProfileSuccess(user));

    if (newPrivacy === true) {
      Alert.alert('Sucesso', 'Termos aceitos com sucesso!');
      return;
    }

    Alert.alert('Sucesso', 'Os termos não foram aceitos!');
  } catch (error) {
    console.log('error::', error);
    Alert.alert(
      'Error',
      'Não foi possível aceitar os termos, tente novamente!',
    );

    yield put(signInFaileru());
  }
}

export function setToken({payload}) {
  if (!payload) return;
  const {token} = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = ` Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/ACCEPT_REGULATION', acceptRegulationUp),
]);
