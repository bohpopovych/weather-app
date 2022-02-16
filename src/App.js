import React from 'react';
import { Provider } from 'react-redux';
import store from './store/reducer';

import Map from './components/Map';
import Search from './components/Search';

export default function App() {
  return (
    <Provider store={store}>
      <Search />
      <Map />
    </Provider>
  );
}
