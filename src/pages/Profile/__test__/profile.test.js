import React from 'react';
import configuredMockStore from 'redux-mock-store';
import toJSON from 'enzyme-to-json';
import { mount } from 'enzyme';
import { TestProvider } from '../../../utils/testUtils';
import initialState from '../../../reducers/initialState';
import '../../../tools/setupEnzyme';
import Profile from '../../Profile';

describe('Profile Page', () => {
  it('should render correctly', () => {
    const store = configuredMockStore()(initialState);
    const container = mount(
      <TestProvider store={store}>
        <Profile />
      </TestProvider>
    );

    expect(toJSON(container)).toMatchSnapshot();
  });
});
