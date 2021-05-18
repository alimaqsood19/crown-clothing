import { takeLatest, put, all, call } from 'redux-saga/effects';
import { Auth } from '@aws-amplify/auth';
import { UserActionTypes } from './user.types';
import {
  setCurrentUserError,
  setCurrentUserSuccess,
  signInError,
  signInSuccess,
} from './user.actions';
import { getUser, getCartInformation } from '../../helpers/authHelper';

function signIn([email, password]) {
  return Auth.signIn(email, password);
}

export function* onSignInAsync({ payload: { email, password } }) {
  try {
    const authObject = yield call(signIn, [email, password]);
    const user = yield call(getCartInformation, authObject);
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInError(error));
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

export function* setCurrentUser() {
  yield takeLatest(UserActionTypes.SET_CURRENT_USER_START, setCurrentUserAsync);
}

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, onSignInAsync);
}

export function* onSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT, onSignOutAsync);
}

export function* userSagas() {
  yield all([call(onSignInStart), call(onSignOut), call(setCurrentUser)]);
}
