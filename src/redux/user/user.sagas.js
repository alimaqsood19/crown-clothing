import { takeLatest, put, all, call } from 'redux-saga/effects';
import { Auth } from '@aws-amplify/auth';
import { UserActionTypes } from './user.types';
import axios from 'axios';
import {
  confirmationError,
  confirmationSuccess,
  setCurrentUserError,
  setCurrentUserSuccess,
  signInError,
  signInSuccess,
  signUpError,
  signUpSuccess,
} from './user.actions';
import { getUser, getCartInformation } from '../../helpers/authHelper';

function signIn([email, password]) {
  return Auth.signIn(email, password);
}

function signUp([email, password]) {
  return Auth.signUp({
    username: email,
    password,
  });
}

function confirmSignUp([email, code]) {
  return Auth.confirmSignUp(email, code);
}

function insertUser([email]) {
  return axios.post('/api/users', { email });
}

export function* onSignInAsync({ payload: { email, password } }) {
  try {
    const authObject = yield call(signIn, [email, password]);
    const user = yield call(getCartInformation, authObject);
    yield put(signInSuccess(user));
  } catch (err) {
    yield put(signInError(err));
  }
}

export function* onSignOutAsync() {
  try {
    yield Auth.signOut();
  } catch (err) {
    yield console.log(err);
  }
}

export function* setCurrentUserAsync() {
  try {
    const user = yield call(getUser);
    yield put(setCurrentUserSuccess(user));
  } catch (err) {
    yield put(setCurrentUserError(err));
  }
}

export function* onSignUpAsync({ payload: { email, password } }) {
  try {
    const { userConfirmed } = yield call(signUp, [email, password]);
    yield put(signUpSuccess(userConfirmed));
  } catch (err) {
    yield put(signUpError(err));
  }
}

export function* onConfirmationAsync({ payload: { email, code } }) {
  try {
    yield call(confirmSignUp, [email, code]);
    yield call(insertUser, [email]);
    yield put(confirmationSuccess());
  } catch (err) {
    yield put(confirmationError());
  }
}

export function* setCurrentUser() {
  yield takeLatest(UserActionTypes.SET_CURRENT_USER_START, setCurrentUserAsync);
}

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, onSignInAsync);
}

export function* onSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT, onSignOutAsync);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, onSignUpAsync);
}

export function* onConfirmationStart() {
  yield takeLatest(UserActionTypes.CONFIRMATION_START, onConfirmationAsync);
}

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onSignOut),
    call(setCurrentUser),
    call(onSignUpStart),
    call(onConfirmationStart),
  ]);
}
