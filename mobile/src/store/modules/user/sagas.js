import {Alert} from 'react-native';

import {takeLatest, call, put, all} from 'redux-saga/effects';

import api from '~/_services/api';

import {updateProfileSuccess, updateProfilefailure} from './actions';

export function* updateProfile({payload}) {
  try {
    const {data} = payload;
    const {id} = payload.data;

    const resp = yield call(api.put, `deliveryman/${id}/profile`, {data});

    Alert.alert('Sucesso!', 'Seu perfil foi atualizado!');

    const {user} = resp.data;
    yield put(updateProfileSuccess(user));
  } catch (error) {
    const str = error.toString();
    const final = str.replace(/\D/g, '');

    const labelErro = 'Erro ao atualizar o perfil!';

    if (final === '400') {
      Alert.alert(
        `${labelErro}`,
        'Não foi possível encontra esse usuário, entre em contato com a empresa!',
      );
      yield put(updateProfilefailure());
      return;
    }

    if (final === '401') {
      Alert.alert(
        `${labelErro}`,
        'Entregado não encontrado, entre em contato com a empresa!',
      );

      yield put(updateProfilefailure());
      return;
    }

    // Make sure the user has been verified
    if (final === '402') {
      Alert.alert(
        `${labelErro}`,
        'No momento esse usuário está desativado, entre em contato com o administrador!',
      );
      yield put(updateProfilefailure());
      return;
    }
    if (final === '403') {
      Alert.alert(
        `${labelErro}`,
        'Já existe uma usuário com esse email, tente novamente!',
      );
      yield put(updateProfilefailure());
      return;
    }
    if (final === '404') {
      Alert.alert(
        `${labelErro}`,
        'Tente fazer logout e acessa sua conta novamente, pois não foi encontrado o fone!',
      );
      yield put(updateProfilefailure());
      return;
    }

    if (final === '405') {
      Alert.alert(
        `${labelErro}`,
        'Esse fone já esta cadastrado, tente novamente!',
      );
      yield put(updateProfilefailure());
      return;
    }
    if (final === '429') {
      Alert.alert(
        `${labelErro}`,
        'Não foi possível conectar ao servidor, tente novamente!',
      );
      yield put(updateProfilefailure());
      return;
    }

    if (str === 'Error: Network Error') {
      Alert.alert(
        `${labelErro}`,
        'Não foi possível conectar ao servidor, tente novamente!',
      );

      yield put(updateProfilefailure());
      return;
    }

    Alert.alert(
      `${labelErro}`,
      'Erro ao atualizar o perfil, confira os seus dados!',
    );

    yield put(updateProfilefailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
