export function signInRequest(password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {password},
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {token, user},
  };
}
export function tokenUpRequest(token) {
  return {
    type: '@auth/TOKEN_UP_REQUEST',
    payload: {token},
  };
}

export function signSuccess() {
  return {type: '@auth/SIGN_SUCCESS'};
}

export function signFailure() {
  return {type: '@auth/SIGN_FAILURE'};
}

export function sigUpFailure() {
  return {type: '@user/SIGNUP_FAILURE'};
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}

export function acceptionRegulation(id, newPrivacy) {
  return {
    type: '@auth/ACCEPT_REGULATION',
    payload: {id, newPrivacy},
  };
}
