import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from '@store/store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>

        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
