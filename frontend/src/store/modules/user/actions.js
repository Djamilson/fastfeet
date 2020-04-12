export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function signUpSuccess() {
  return {
    type: '@user/SIGN_UP_SUCCESS',
  };
}

export function signInFaileru() {
  return {
    type: '@user/SIGN_IN_FAILURE',
  };
}

export function updateProfileAvatarRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_AVATAR_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfilefailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}
