import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { updateFinalPrice } from '@store/reducers/orderDetailsReduces';
import formatPrice from '@utils/helpers/formatPrice';
import cl from './OrderDetailsPrice.module.scss';

const OrderDetailsPrice: React.FC = () => {
  const dispatch = useAppDispatch();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [price, setPrice] = useState('');
  const orderDetailsModelData = useAppSelector(
    (state) => state.orderDetails.model.value,
  );
  const dateFrom = useAppSelector(
    (state) => state.orderDetails.options.dateFrom,
  );
  const dateTo = useAppSelector((state) => state.orderDetails.options.dateTo);
  const rate = useAppSelector((state) => state.orderDetails.options.rateName);
  const ratePrice = useAppSelector(
    (state) => state.orderDetails.options.ratePrice,
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
      switch (rate) {
        case 'Поминутно':
          finalPrice = (duration / 1000 / 60) * ratePrice;

          break;
        case 'Месячный':
          finalPrice =
            Math.ceil(duration / 1000 / 60 / 60 / 24 / 30) * ratePrice;

          break;

        // no default
      }

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
