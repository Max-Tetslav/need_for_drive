import React, { useCallback, useEffect } from 'react';
import { EOrderItemTypes } from '@models/orderPageData';
import { IOrderModelData, IOrderPointData } from '@store/reducers/orderDetailsReduces';
import cl from './OrderDetailsItem.module.scss';

interface IOrderDetailsItemProps {
  type: EOrderItemTypes;
  title: string;
  itemData: unknown;
}

const OrderDetailsItem: React.FC<IOrderDetailsItemProps> = ({ title, itemData, type }) => {
  useEffect(() => {}, [itemData]);

  const getRightData = useCallback((): JSX.Element => {
    switch (type) {
      case EOrderItemTypes.POINT: {
        if ((itemData as IOrderPointData).status) {
          return (
            <>
              <span>{(itemData as IOrderPointData).value.city}</span>
              <br />
              <span>{(itemData as IOrderPointData).value.address}</span>
            </>
          );
        }
        return (
          <>
            <span>Выберите</span>
            <br />
            <span>пункт выдачи</span>
          </>
        );
      }
      case EOrderItemTypes.MODEL: {
        if ((itemData as IOrderModelData).status) {
          return <span>{(itemData as IOrderModelData).value.model}</span>;
        }
        return (
          <>
            <span>Выберите</span>
            <br />
            <span>модель авто</span>
          </>
        );
      }
      // no default
    }
  }, [itemData]);

  return (
    <div className={cl.orderDetailsItem}>
      <h4 className={cl.orderDetailsItemTitle}>{title}</h4>
      <span className={cl.orderDetailsItemDots} />
      <p className={cl.orderDetailsItemContent}>{getRightData()}</p>
    </div>
  );
};

export default OrderDetailsItem;
