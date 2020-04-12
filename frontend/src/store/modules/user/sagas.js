import { toast } from 'react-toastify';

import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/_services/api';
import history from '~/_services/history';

import { updateProfileSuccess, updateProfilefailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = { name, email, ...(rest.oldPassword ? rest : {}) };

    const res = yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(res.data.user));
    history.push('/orders');
  } catch (error) {
    const str = error.toString();
    const final = str.replace(/\D/g, '');

    if (final === '400') {
      toast.error('As senha inseridas são diferentes, tente novamente!');
      yield put(updateProfilefailure());
      return;
    }

    if (final === '401') {
      toast.error('Sua senha atual está incorreta!');
      yield put(updateProfilefailure());
      return;
    }

    toast.error('Erro ao atualizar o perfil, confira os seus dados!');

    yield put(updateProfilefailure());
  }
}

export function* updateProfileAvatar({ payload }) {
  try {
    const { avatar_id } = payload.data;

    const response = yield call(api.put, `avatar/${avatar_id}`);

    toast.success('Avatar atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data.user));
  } catch (error) {
    toast.error('Erro ao atualizar o avatar, tente novamente!');
    yield put(updateProfilefailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/UPDATE_PROFILE_AVATAR_REQUEST', updateProfileAvatar),
]);
