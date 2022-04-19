import React from 'react';
import OrderInput from '@components/common/orderInput/OrderInput';
import Map from '@components/common/map/Map';
import cl from './OrderPlaceContent.module.scss';

const OrderPlaceContent: React.FC = () => {
  return (
    <div className={cl.pointContainer}>
      <div className={cl.inputContainer}>
        <OrderInput
          type="city"
          label={'Город\xa0\xa0'}
          placeholder="Начните вводить город..."
        />
        <OrderInput
          type="point"
          label={'Пункт выдачи\xa0'}
          placeholder="Начните вводить пункт..."
        />
      </div>
      <p className={cl.mapText}>Выбрать на карте:</p>
      <Map />
    </div>
  );
};

export default OrderPlaceContent;
