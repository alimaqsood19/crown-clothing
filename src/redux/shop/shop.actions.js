import ShopActionTypes from './shop.types';
import axios from 'axios';

const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

const fetchCollectionsSuccess = (collections) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collections.data,
});

const fetchCollectionsError = (error) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_ERROR,
  payload: error,
});

export const asyncFetchCollections = () => async (dispatch) => {
  dispatch(fetchCollectionsStart());
  try {
    const collections = await axios.get('/api/collections');
    dispatch(fetchCollectionsSuccess(collections));
  } catch (err) {
    dispatch(fetchCollectionsError());
  }
};
