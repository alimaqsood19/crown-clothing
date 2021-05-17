import ShopActionTypes from './shop.types';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collections) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collections.data,
});

export const fetchCollectionsError = (error) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_ERROR,
  payload: error,
});
