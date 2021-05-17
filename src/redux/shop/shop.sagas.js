import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import ShopActionTypes from './shop.types';
import { fetchCollectionsSuccess, fetchCollectionsError } from './shop.actions';

function fetchCollections() {
  return axios.get('/api/collections');
}

export function* fetchCollectionsAsync() {
  try {
    const collections = yield call(fetchCollections);
    yield put(fetchCollectionsSuccess(collections));
  } catch (err) {
    yield put(fetchCollectionsError(err));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
