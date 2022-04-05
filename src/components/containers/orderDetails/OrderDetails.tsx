import OrderDetailsButton from '@components/common/orderDetailsButton/OrderDetailsButton';
import OrderDetailsItem from '@components/common/orderDetailsItem/OrderDetailsItem';
import OrderDetailsPrice from '@components/common/orderDetailsPrice/OrderDetailsPrice';
import { EOrderItemTypes } from '@models/orderPageData';
import { completeModel } from '@store/reducers/breadcrumbReducer';
import { updatePointStatus } from '@store/reducers/orderDetailsReduces';
import { useAppDispatch, useAppSelector } from '@store/store';
import React, { useEffect } from 'react';
import cl from './OrderDetails.module.scss';

const OrderDetails: React.FC = () => {
  const orderDetailsData = useAppSelector((state) => state.orderDetails);
  const pointState = useAppSelector((state) => state.orderDetails.point);
  const modelState = useAppSelector((state) => state.orderDetails.model);
  // let colorState;
  // let durationState;
  // let rateState;
  // let isFullOil;
  // let isChildSeat;
  // let isRightWheel;

  const dispatch = useAppDispatch();

  useEffect(() => {}, [modelState.status]);

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
      {orderDetailsData.model.status && (
        <OrderDetailsItem
          title="Модель"
          itemData={modelState}
          type={EOrderItemTypes.MODEL}
        />
      )}

      <OrderDetailsPrice />
      <OrderDetailsButton />
    </div>
  );
};

export default OrderDetails;
