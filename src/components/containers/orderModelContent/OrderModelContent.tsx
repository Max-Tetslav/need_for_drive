import React from 'react';
import OrderCarsList from '../orderCarsList/OrderCarsList';
import OrderModelRadioGroup from '../orderModelRadioGroup/OrderModelRadioGroup';

const OrderModelContent: React.FC = () => {
  return (
    <>
      <OrderModelRadioGroup />
      <OrderCarsList />
    </>
  );
};

export default OrderModelContent;
