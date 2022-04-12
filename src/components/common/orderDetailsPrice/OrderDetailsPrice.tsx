import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@store/store';
import formatPrice from '@utils/helpers/formatPrice';
import cl from './OrderDetailsPrice.module.scss';

const OrderDetailsPrice: React.FC = () => {
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
    if (orderDetailsModelData.maxPrice) {
      setMinPrice(formatPrice(orderDetailsModelData.minPrice));
      setMaxPrice(formatPrice(orderDetailsModelData.maxPrice));
      setPriceRange(`от ${minPrice} до ${maxPrice} `);
    }
  }, [orderDetailsModelData.model, minPrice, maxPrice]);

  useMemo(() => {
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
    } else {
      setPrice('');
    }
  }, [dateFrom, dateTo, rate, isFullTank, isNeedChildChair, isRightWheel]);

  return priceRange ? (
    <p className={cl.price}>Цена: {price || priceRange} ₽</p>
  ) : null;
};

export default OrderDetailsPrice;
