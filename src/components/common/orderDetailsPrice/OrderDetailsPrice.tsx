import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { updateFinalPrice } from '@store/reducers/orderDetailsReducer';
import { IRateTypeId } from '@models/orderPageData';
import formatPrice from '@utils/helpers/formatPrice';
import countRatePrice from '@utils/helpers/countRatePrice';
import cl from './OrderDetailsPrice.module.scss';

const OrderDetailsPrice: React.FC = () => {
  const dispatch = useAppDispatch();
  const orderDetailsModelData = useAppSelector(
    (state) => state.orderDetails.model.value,
  );
  const dateFrom = useAppSelector(
    (state) => state.orderDetails.options.dateFrom,
  );
  const dateTo = useAppSelector((state) => state.orderDetails.options.dateTo);
  const rate = useAppSelector(
    (state) => (state.orderDetails.options.rate.rateTypeId as IRateTypeId).name,
  );
  const ratePrice = useAppSelector(
    (state) => state.orderDetails.options.rate.price,
  );
  const isFullTank = useAppSelector(
    (state) => state.orderDetails.options.isFullTank,
  );
  const isNeedChildChair = useAppSelector(
    (state) => state.orderDetails.options.isNeedChildChair,
  );
  const isRightWheel = useAppSelector(
    (state) => state.orderDetails.options.isRightWheel,
  );
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (orderDetailsModelData.priceMax) {
      setMinPrice(formatPrice(orderDetailsModelData.priceMin));
      setMaxPrice(formatPrice(orderDetailsModelData.priceMax));
      setPriceRange(`от ${minPrice} до ${maxPrice} `);
    }
  }, [orderDetailsModelData, minPrice, maxPrice]);

  const setFinalPrice = useCallback(() => {
    let finalPrice = 0;
    const duration = dateTo - dateFrom;

    if (dateFrom && dateTo && rate) {
      finalPrice = countRatePrice(rate, ratePrice, duration);

      if (isFullTank) {
        finalPrice += 500;
      }

      if (isNeedChildChair) {
        finalPrice += 200;
      }

      if (isRightWheel) {
        finalPrice += 1600;
      }

      setPrice(formatPrice(finalPrice));
      dispatch(updateFinalPrice(finalPrice));
    } else {
      setPrice('');
      dispatch(updateFinalPrice(0));
    }
  }, [dateFrom, dateTo, rate, isFullTank, isNeedChildChair, isRightWheel]);

  useEffect(() => {
    setFinalPrice();
  }, [setFinalPrice]);

  return priceRange ? (
    <p className={cl.price}>Цена: {price || priceRange} ₽</p>
  ) : null;
};

export default OrderDetailsPrice;
