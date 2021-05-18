import { UserActionTypes } from './user.types';
export const setCurrentUserStart = () => ({
  type: UserActionTypes.SET_CURRENT_USER_START,
});

export const setCurrentUserSuccess = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER_SUCCESS,
  payload: user,
});

export const setCurrentUserError = (err) => ({
  type: UserActionTypes.SET_CURRENT_USER_SUCCESS,
  payload: err,
});

export const signInStart = (user) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: user,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInError = (err) => ({
  type: UserActionTypes.SIGN_IN_ERROR,
  payload: err,
});

export const signOut = (err) => ({
  type: UserActionTypes.SIGN_OUT,
  payload: err,
});
