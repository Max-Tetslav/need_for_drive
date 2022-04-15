import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@store/store';
import needForDriveApi from '@services/needForDriveAPI';
import {
  updateRateName,
  updateRatePrice,
} from '@store/reducers/orderDetailsReduces';
import { IRate, IRateTypeId } from '@models/orderPageData';
import OrderRadio from '@components/common/orderRadio/OrderRadio';
import cl from './OptionsRateGroup.module.scss';

const OptionsRateGroup: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data } = needForDriveApi.useGetRatesListQuery('');
  const [rateList, setRateList] = useState<IRate[]>([]);

  const setData = useCallback(() => {
    if (data) {
      const filteredData = data.data.filter((item) => item.rateTypeId);

      setRateList(filteredData);
    }
  }, [data]);

  const [rate, setRate] = useState('');

  const selectRate = useCallback(() => {
    if (rate) {
      const currentRate = rateList.filter((item) => item.id === rate)[0];

      dispatch(updateRateName((currentRate.rateTypeId as IRateTypeId).name));
      dispatch(updateRatePrice(currentRate.price));
    }
  }, [rate]);

  useEffect(() => {
    setData();
  }, [setData]);

  useEffect(() => {
    selectRate();
  }, [selectRate]);

  return (
    <div className={cl.container}>
      <h4 className={cl.title}>Тариф</h4>
      <div className={cl.rateGroup}>
        {rateList.length &&
          rateList.map((item) => {
            const orderTitle = `${(item.rateTypeId as IRateTypeId).name} ${
              item.price
            } ₽/${(item.rateTypeId as IRateTypeId).unit}`;

            return (
              <OrderRadio
                title={orderTitle}
                id={item.id}
                groupName="rate"
                checkedId={rate}
                setFilterId={setRate}
              />
            );
          })}
      </div>
    </div>
  );
};

export default OptionsRateGroup;
