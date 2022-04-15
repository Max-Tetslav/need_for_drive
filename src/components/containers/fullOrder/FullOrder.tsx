import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '@store/store';
import {
  updateColor,
  updateDateFrom,
  updateDateTo,
  updateDuration,
  updateFinalPrice,
  updateIsFullTank,
  updateIsNeedChildChair,
  updateIsRightWheel,
  updateModel,
  updatePoint,
  updateRate,
} from '@store/reducers/orderDetailsReducer';
import needForDriveApi from '@services/needForDriveAPI';
import { IRate } from '@models/orderPageData';
import getDurationString from '@utils/helpers/getDurationString';
import cl from './FullOrder.module.scss';

const FullOrder: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const locationArr = location.pathname.split('/');
  const orderId = locationArr[locationArr.length - 1].replace(':', '');
  const { data: order } = needForDriveApi.useGetOrderQuery(orderId);
  const [tank, setTank] = useState<number>();

  useEffect(() => {
    if (order) {
      const response = order.data;

      if (response.isFullTank) {
        setTank(100);
      } else if (response.carId.tank) {
        setTank(response.carId.tank);
      } else {
        setTank(35);
      }

      dispatch(updatePoint({ ...response.pointId, cityId: response.cityId }));
      dispatch(updateModel(response.carId));
      dispatch(updateDateFrom(response.dateFrom));
      dispatch(updateDateTo(response.dateTo));
      dispatch(updateRate(response.rateId as IRate));
      dispatch(updateIsFullTank(response.isFullTank as boolean));
      dispatch(updateIsNeedChildChair(response.isNeedChildChair as boolean));
      dispatch(updateIsRightWheel(response.isRightWheel as boolean));
      dispatch(updateColor(response.color as string));
      dispatch(
        updateDuration(getDurationString(response.dateFrom, response.dateTo)),
      );
      dispatch(updateFinalPrice(response.price));
    }
  }, [order]);

  return (
    <div className={cl.container}>
      {order ? (
        <>
          <div className={cl.infoContainer}>
            <p className={cl.orderStatus}>Ваш заказ подтверждён</p>
            <p className={cl.model}>{order.data.carId.name}</p>
            {order.data.carId.number ? (
              <p className={cl.number}>
                {order.data.carId.number
                  .replace(/\d{1,}/g, ` $& `)
                  .toLocaleUpperCase()}
              </p>
            ) : null}
            <p className={cl.otherText}>
              <strong>Топливо</strong>
              {` ${tank} %`}
            </p>
            <p className={cl.otherText}>
              <strong>{'Доступна с '}</strong>
              {new Date(order.data.dateFrom).toLocaleString().slice(0, -3)}
            </p>
          </div>
          <img
            className={cl.img}
            src={order.data.carId.thumbnail.path}
            alt="model"
          />
        </>
      ) : null}
    </div>
  );
};

export default FullOrder;
