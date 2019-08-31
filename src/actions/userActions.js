import { 
  CREATE_USER,
  AUTHENTICATE_USER,
  UPDATE_USER,
  UPDATE_PROFILE,
  LOGOUT
} from '../constants/actionTypes';
import { 
  createUser,
  authenticateUser,
  updateUser
} from '../api/user';
import history from '../utils/history';

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

export const save = (id, profile) => dispatch => {
  dispatch({ type: UPDATE_PROFILE });

  return updateUser(id, profile);
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });

  history.push('/login');
}
