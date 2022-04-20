import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@store/store';
import needForDriveApi from '@services/needForDriveAPI';
import {
  updateRate,
  updateRateName,
  updateRatePrice,
} from '@store/reducers/orderDetailsReducer';
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
      const currentRate = rateList.filter(
        (item) => (item.rateTypeId?.id as string) === rate,
      )[0];

      dispatch(updateRate(currentRate));
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
                id={item.rateTypeId?.id as string}
                groupName="rate"
                checkedId={rate}
                setFilterId={setRate}
                key={item.rateTypeId?.id as string}
              />
            );
          })}
      </div>
    </div>
  );
};

export default OptionsRateGroup;
