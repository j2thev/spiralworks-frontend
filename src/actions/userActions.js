import { 
  CREATE_USER,
  AUTHENTICATE_USER,
  UPDATE_USER
} from '../constants/actionTypes';
import { createUser, authenticateUser } from '../api/user';

export const create = user => dispatch => {
  dispatch({ type: CREATE_USER });

  return createUser(user);
};

export const login = user => dispatch => {
  dispatch({ type: AUTHENTICATE_USER });

  return authenticateUser(user);
};

export const update = user => ({
  type: UPDATE_USER, 
  payload: user 
});
