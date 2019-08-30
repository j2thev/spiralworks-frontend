import initialState from './initialState';
import * as TYPES from '../constants/actionTypes';

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case TYPES.UPDATE_USER: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
