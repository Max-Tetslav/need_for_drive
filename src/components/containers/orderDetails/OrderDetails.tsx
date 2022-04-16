import React from 'react';
import { useAppSelector } from '@store/store';
import { EOrderItemTypes, IRateTypeId } from '@models/orderPageData';
import OrderDetailsButton from '@components/common/orderDetailsButton/OrderDetailsButton';
import OrderDetailsItem from '@components/common/orderDetailsItem/OrderDetailsItem';
import OrderDetailsPrice from '@components/common/orderDetailsPrice/OrderDetailsPrice';
import cl from './OrderDetails.module.scss';

const OrderDetails: React.FC = () => {
  const modelState = useAppSelector((state) => state.orderDetails.model.value);
  const optionsState = useAppSelector((state) => state.orderDetails.options);
  const pointState = useAppSelector(
    (state) => state.orderDetails.point.orderData,
  );
  const rateState = useAppSelector(
    (state) => (state.orderDetails.options.rate.rateTypeId as IRateTypeId).name,
  );

  return (
    <div className={cl.orderDetailsContainer}>
      <h3 className={cl.orderDetailsTitle}>Ваш заказ:</h3>
      <OrderDetailsItem
        title="Пункт выдачи"
        itemData={pointState}
        type={EOrderItemTypes.POINT}
      />
      {modelState.name && (
        <OrderDetailsItem
          title="Модель"
          itemData={modelState}
          type={EOrderItemTypes.MODEL}
        />
      )}
      {optionsState.color && (
        <OrderDetailsItem
          title="Цвет"
          itemData={optionsState.color}
          type={EOrderItemTypes.COLOR}
        />
      )}
      {optionsState.duration && (
        <OrderDetailsItem
          title="Длительность аренды"
          itemData={optionsState.duration}
          type={EOrderItemTypes.DURATION}
        />
      )}
      {rateState && (
        <OrderDetailsItem
          title="Тариф"
          itemData={rateState}
          type={EOrderItemTypes.RATE}
        />
      )}
      {optionsState.isFullTank && (
        <OrderDetailsItem
          title="Полный бак"
          itemData={optionsState.isFullTank}
          type={EOrderItemTypes.TANK}
        />
      )}
      {optionsState.isNeedChildChair && (
        <OrderDetailsItem
          title="Детское кресло"
          itemData={optionsState.isNeedChildChair}
          type={EOrderItemTypes.CHAIR}
        />
      )}
      {optionsState.isRightWheel && (
        <OrderDetailsItem
          title="Правый руль"
          itemData={optionsState.isRightWheel}
          type={EOrderItemTypes.WHEEL}
        />
      )}
      <OrderDetailsPrice />
      <OrderDetailsButton />
    </div>
  );
};

export default OrderDetails;
