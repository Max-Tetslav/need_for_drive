import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { updatePointStatus } from '@store/reducers/orderDetailsReduces';
import { completeModel } from '@store/reducers/breadcrumbReducer';
import { EOrderItemTypes } from '@models/orderPageData';
import OrderDetailsButton from '@components/common/orderDetailsButton/OrderDetailsButton';
import OrderDetailsItem from '@components/common/orderDetailsItem/OrderDetailsItem';
import OrderDetailsPrice from '@components/common/orderDetailsPrice/OrderDetailsPrice';
import cl from './OrderDetails.module.scss';

const OrderDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const pointState = useAppSelector((state) => state.orderDetails.point);
  const modelState = useAppSelector((state) => state.orderDetails.model);
  const colorState = useAppSelector(
    (state) => state.orderDetails.options.color,
  );
  const durationState = useAppSelector(
    (state) => state.orderDetails.options.duration,
  );
  const rateState = useAppSelector(
    (state) => state.orderDetails.options.rateName,
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
    if (pointState.value.city && pointState.value.address) {
      dispatch(updatePointStatus(true));
      dispatch(completeModel(true));
    }
  }, [pointState]);

  return (
    <div className={cl.orderDetailsContainer}>
      <h3 className={cl.orderDetailsTitle}>Ваш заказ:</h3>
      <OrderDetailsItem
        title="Пункт выдачи"
        itemData={pointState}
        type={EOrderItemTypes.POINT}
      />
      {modelState.status && (
        <OrderDetailsItem
          title="Модель"
          itemData={modelState}
          type={EOrderItemTypes.MODEL}
        />
      )}
      {colorState && (
        <OrderDetailsItem
          title="Цвет"
          itemData={colorState}
          type={EOrderItemTypes.COLOR}
        />
      )}
      {durationState && (
        <OrderDetailsItem
          title="Длительность аренды"
          itemData={durationState}
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
      {isFullTank && (
        <OrderDetailsItem
          title="Полный бак"
          itemData={isFullTank}
          type={EOrderItemTypes.TANK}
        />
      )}
      {isNeedChildChair && (
        <OrderDetailsItem
          title="Детское кресло"
          itemData={isNeedChildChair}
          type={EOrderItemTypes.CHAIR}
        />
      )}
      {isRightWheel && (
        <OrderDetailsItem
          title="Правый руль"
          itemData={isRightWheel}
          type={EOrderItemTypes.WHEEL}
        />
      )}
      <OrderDetailsPrice />
      <OrderDetailsButton />
    </div>
  );
};

export default OrderDetails;
