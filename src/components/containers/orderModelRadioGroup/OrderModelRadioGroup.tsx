import React from 'react';
import { ICarCategory } from '@models/orderPageData';
import OrderRadio from '@components/common/orderRadio/OrderRadio';
import cl from './OrderModelRadioGroup.module.scss';

interface IOrderModelRadioGroupProps {
  filterBy: string;
  setFilterBy: React.Dispatch<React.SetStateAction<string>>;
  data: ICarCategory[];
}

const OrderModelRadioGroup: React.FC<IOrderModelRadioGroupProps> = ({
  filterBy,
  setFilterBy,
  data,
}) => {
  return (
    <ul className={cl.list}>
      <OrderRadio
        title="Все модели"
        id=""
        checkedId={filterBy}
        setFilterId={setFilterBy}
      />
      {data.map((item: ICarCategory) => {
        return (
          <li className={cl.listItem} key={item.id}>
            <OrderRadio
              title={item.name}
              id={item.id}
              checkedId={filterBy}
              setFilterId={setFilterBy}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default OrderModelRadioGroup;
