import React, { useCallback } from 'react';
import {
  IOrderModelData,
  IOrderPointData,
} from '@store/reducers/orderDetailsReduces';
import { EOrderItemTypes } from '@models/orderPageData';
import cl from './OrderDetailsItem.module.scss';

interface IOrderDetailsItemProps {
  type: EOrderItemTypes;
  title: string;
  itemData: unknown;
}

const OrderDetailsItem: React.FC<IOrderDetailsItemProps> = ({
  title,
  itemData,
  type,
}) => {
  const getRightData = useCallback(() => {
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
        break;
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
        break;
      }
      case EOrderItemTypes.COLOR: {
        if (itemData) {
          return <span>{itemData as string}</span>;
        }
        break;
      }
      case EOrderItemTypes.DURATION: {
        if (itemData) {
          return <span>{itemData as string}</span>;
        }
        break;
      }
      case EOrderItemTypes.RATE: {
        if (itemData) {
          return <span>{itemData as string}</span>;
        }
        break;
      }
      case EOrderItemTypes.TANK: {
        if (itemData) {
          return <span>Да</span>;
        }
        break;
      }
      case EOrderItemTypes.CHAIR: {
        if (itemData) {
          return <span>Да</span>;
        }
        break;
      }
      case EOrderItemTypes.WHEEL: {
        if (itemData) {
          return <span>Да</span>;
        }
        break;
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
