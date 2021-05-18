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

export const signUpStart = (email, password) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: { email, password },
});

export const signUpSuccess = (email) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: email,
});

export const signUpError = (err) => ({
  type: UserActionTypes.SIGN_UP_ERROR,
  payload: err,
});

export const confirmationStart = (email, code) => ({
  type: UserActionTypes.CONFIRMATION_START,
  payload: { email, code },
});

export const confirmationSuccess = () => ({
  type: UserActionTypes.CONFIRMATION_SUCCESS,
});

export const confirmationError = (err) => ({
  type: UserActionTypes.CONFIRMATION_ERROR,
  payload: err,
});
