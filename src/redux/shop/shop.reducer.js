import SHOP_DATA from './shopData';
import ShopActionTypes from './shop.types';

const shopReducer = (
  state = { collections: [], isFetching: false, error: null },
  action
) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return { ...state, isFetching: true };
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return { ...state, collections: action.payload, isFetching: false };
    case ShopActionTypes.FETCH_COLLECTIONS_ERROR:
      return {
        ...state,
        collections: null,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
