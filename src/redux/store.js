import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk]; //Array of middlewares (add more or less)

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
); //Spread operator adds middlewares as individual arguments
export const persistor = persistStore(store); //Creates a persisted version of our store
