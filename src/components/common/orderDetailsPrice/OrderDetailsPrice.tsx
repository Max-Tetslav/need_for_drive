import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@store/store';
import formatPrice from '@utils/helpers/formatPrice';
import cl from './OrderDetailsPrice.module.scss';

const OrderDetailsPrice: React.FC = () => {
  const orderDetailsModelData = useAppSelector(
    (state) => state.orderDetails.model.value,
  );
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (orderDetailsModelData.maxPrice) {
      setMinPrice(formatPrice(orderDetailsModelData.minPrice));
      setMaxPrice(formatPrice(orderDetailsModelData.maxPrice));
      setValue(`от ${minPrice} до ${maxPrice} ₽`);
    }
  }, [orderDetailsModelData.model, minPrice, maxPrice]);

  return value ? <p className={cl.price}>Цена: {value}</p> : null;
};

export default OrderDetailsPrice;
