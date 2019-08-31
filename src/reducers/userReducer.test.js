import { expect } from 'chai';
import userReducer from './userReducer';
import { UPDATE_USER } from '../constants/actionTypes';
import initialState from './initialState';

describe('User Reducer', () => {
  it('should return initial state', () => {
    const actions = {
      type: 'DEFAULT'
    };

    expect(userReducer(initialState.user, actions)).to.deep.equal(
      initialState.user
    );
  });

  it('should update state when action type is UPDATE_USER ', () => {
    const action = {
      type: UPDATE_USER,
      payload: {
        firstName: 'Juan'
      }
    };
    const expectedNextState = Object.assign({}, initialState.user, action.payload);

    expect(userReducer(initialState.user, action)).to.deep.equal(expectedNextState);
  });
});
