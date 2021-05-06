import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import sessionStorage from 'redux-persist/lib/' --> find session storage if you want that instead
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], //Only reducer we want to persist is the cart at the moment
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});
export default persistReducer(persistConfig, rootReducer);
