import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from '@store/store';
import Root from '@views/root/Root';
import Homepage from '@views/homepage/Homepage';
import OrderPage from '@views/orderPage/OrderPage';
import OrderPlaceContent from '@components/containers/orderPlaceContent/OrderPlaceContent';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Homepage />} />
            <Route path="/order/place" element={<OrderPage />}>
              <Route index element={<OrderPlaceContent />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;