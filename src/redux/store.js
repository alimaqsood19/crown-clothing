import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import rootSaga from './root-saga';
import rootReducer from './root-reducer';
import createSagaMiddleware from 'redux-saga';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware]; //Array of middlewares (add more or less)
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
); //Spread operator adds middlewares as individual arguments

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store); //Creates a persisted version of our store
