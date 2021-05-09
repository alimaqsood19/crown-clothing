import SHOP_DATA from './shopData';
import ShopActionTypes from './shop.types';

const shopReducer = (state = { collections: SHOP_DATA }, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS:
      return { ...state, collections: action.payload };
    default:
      return state;
  }
};

export default shopReducer;
