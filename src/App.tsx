import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from '@store/store';
import Root from '@views/root/Root';
import Homepage from '@views/homepage/Homepage';
import OrderPage from '@views/orderPage/OrderPage';
import OrderPlaceContent from '@components/containers/orderPlaceContent/OrderPlaceContent';
import OrderModelContent from '@components/containers/orderModelContent/OrderModelContent';
import OptionsContent from '@components/containers/optionsContent/OptionsContent';
import TotalContent from '@components/containers/totalContent/TotalContent';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Homepage />} />
            <Route path="/order" element={<OrderPage />}>
              <Route path="place" element={<OrderPlaceContent />} />
              <Route path="model" element={<OrderModelContent />} />
              <Route path="options" element={<OptionsContent />} />
              <Route path="total" element={<TotalContent />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
