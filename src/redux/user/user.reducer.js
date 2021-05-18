import { UserActionTypes } from './user.types';
const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isFetching: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER_START:
      return {
        ...state, //Everything else on the state..
        isFetching: true,
      };
    case UserActionTypes.SET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isFetching: false,
      };
    case UserActionTypes.SET_CURRENT_USER_ERROR:
      return {
        ...state,
        currentUser: null,
        isFetching: false,
      };
    case UserActionTypes.SIGN_IN_START:
      return {
        ...state,
        isFetching: true,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isFetching: false,
      };
    case UserActionTypes.SIGN_IN_ERROR:
      return {
        ...state,
        error: action.payload,
        currentUser: null,
        isFetching: false,
      };
    case UserActionTypes.SIGN_OUT:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default userReducer;
