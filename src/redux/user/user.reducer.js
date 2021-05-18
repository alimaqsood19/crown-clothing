import { UserActionTypes } from './user.types';
const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isFetching: false,
  confirmationRequired: false,
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
    case UserActionTypes.CONFIRMATION_ERROR:
    case UserActionTypes.SIGN_UP_ERROR:
    case UserActionTypes.SET_CURRENT_USER_ERROR:
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
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        confirmationRequired: true,
      };
    case UserActionTypes.CONFIRMATION_SUCCESS:
      return {
        ...state,
        confirmationRequired: false,
      };
    default:
      return state;
  }
};

export default userReducer;
