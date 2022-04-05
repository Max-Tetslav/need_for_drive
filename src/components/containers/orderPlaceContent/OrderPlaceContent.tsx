import React, { useState } from 'react';
import OrderInput from '@components/common/orderInput/OrderInput';
import Map from '@components/common/map/Map';
import cl from './OrderPlaceContent.module.scss';

const OrderPlaceContent: React.FC = () => {
  const [cityValue, setCityValue] = useState<string>('');
  const [pointValue, setPointValue] = useState<string>('');

  return (
    <div className={cl.pointContainer}>
      <div className={cl.inputContainer}>
        <OrderInput type="city" label={'Город\xa0\xa0'} placeholder="Начните вводить город..." setValue={setCityValue} />
        <OrderInput type="point" label={'Пункт выдачи\xa0'} placeholder="Начните вводить пункт..." setValue={setPointValue} />
      </div>
      <p className={cl.mapText}>Выбрать на карте:</p>
      <Map city={cityValue} point={pointValue} />
    </div>
  );
};

export default OrderPlaceContent;
