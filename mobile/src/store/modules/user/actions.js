export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: {data},
  };
}

export function signInFaileru() {
  return {
    type: '@user/SIGN_IN_FAILURE',
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: {profile},
  };
}

export function updateProfilefailure() {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
  };
}
