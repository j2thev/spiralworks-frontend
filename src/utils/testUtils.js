import React from 'react';
import { Provider } from 'react-redux';

export function TestProvider({ children, store }) {
  return <Provider store={store}>{children}</Provider>;
}
