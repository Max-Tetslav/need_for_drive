import OrderRadio from '@components/common/orderRadio/OrderRadio';
import { ICarCategory } from '@models/orderPageData';
import needForDriveApi from '@services/needForDriveAPI';
import React from 'react';
import cl from './OrderModelRadioGroup.module.scss';

const OrderModelRadioGroup: React.FC = () => {
  const { data, isLoading } = needForDriveApi.useGetCarsCategoriesQuery('');

  return isLoading ? (
    <h1>Загрузка</h1>
  ) : (
    <ul className={cl.list}>
      <OrderRadio title="Все модели" checked />
      {(data as { data: ICarCategory[] }).data.map((item: ICarCategory) => {
        return (
          <li className={cl.listItem} key={item.id}>
            <OrderRadio title={item.name} checked={false} />
          </li>
        );
      })}
    </ul>
  );
};

export default OrderModelRadioGroup;
