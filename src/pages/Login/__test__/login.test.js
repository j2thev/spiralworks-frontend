import React from 'react';
import configuredMockStore from 'redux-mock-store';
import toJSON from 'enzyme-to-json';
import { mount } from 'enzyme';
import { TestProvider } from '../../../utils/testUtils';
import initialState from '../../../reducers/initialState';
import '../../../tools/setupEnzyme';
import Login from '../../Login';

describe('Login Page', () => {
  it('should render correctly', () => {
    const store = configuredMockStore()(initialState);
    const container = mount(
      <TestProvider store={store}>
        <Login />
      </TestProvider>
    );

    expect(toJSON(container)).toMatchSnapshot();
  });
});
