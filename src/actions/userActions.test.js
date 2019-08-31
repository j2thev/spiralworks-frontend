import { expect } from 'chai';
import thunk from 'redux-thunk';
import configuredMockStore from 'redux-mock-store';
import * as userActions from './userActions';
import {
  CREATE_USER,
  AUTHENTICATE_USER,
  UPDATE_USER,
  UPDATE_PROFILE,
  LOGOUT
} from '../constants/actionTypes';
import faker from 'faker';

const mockUser = {
  email: faker.internet.email(),
  phoneNo: `09${faker.random.number({ min: 0, max: 999999999})}`,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  password: faker.internet.password()
};

describe('User Actions', () => {
  it('should dispatch CREATE_USER', () => {
    const mockStore = configuredMockStore([thunk]);
    const store = mockStore({});
    const actions = store.getActions();

    userActions.create(mockUser)(store.dispatch);

    expect(actions[0]).to.deep.equal({
      type: CREATE_USER
    });
  });
  
  it('should dispatch AUTHENTICATE_USER', done => {
    const mockStore = configuredMockStore([thunk]);
    const store = mockStore({});
    const actions = store.getActions();
    const { email, password} = mockUser;
    const mockCredentials = {
      username: email,
      password
    };

    userActions.login(mockCredentials)(store.dispatch)
      .then(result => {
        const { data } = result.data;
        const { _id: id } = data;
        
        Object.assign(mockUser, { id });

        expect(actions[0]).to.deep.equal({
          type: AUTHENTICATE_USER
        });

        done();
      });
  });
  
  it('should dispatch UPDATE_USER', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});
    const actions = store.getActions();
    const expectedPayload = { ...mockUser };

    store.dispatch(userActions.update(expectedPayload));

    expect(actions[0]).to.deep.equal({
      type: UPDATE_USER,
      payload: expectedPayload
    });
  });

  it('should dispatch UPDATE_PROFILE', () => {
    const mockStore = configuredMockStore([thunk]);
    const store = mockStore({});
    const actions = store.getActions();
    const { id: mockId, firstName } = mockUser;
    const mockProfile = {
      firstName
    }

    userActions.save(mockId, mockProfile)(store.dispatch);

    expect(actions[0]).to.deep.equal({
      type: UPDATE_PROFILE
    });
  });
  
  it('should dispatch LOGOUT', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});
    const actions = store.getActions();

    userActions.logout()(store.dispatch);

    expect(actions[0]).to.deep.equal({
      type: LOGOUT
    });
  });
})
