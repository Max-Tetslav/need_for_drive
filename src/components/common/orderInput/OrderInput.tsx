import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Input } from 'antd';
import needForDriveApi from '@services/needForDriveAPI';
import { useAppDispatch, useAppSelector } from '@store/store';
import { ELocationInputTypes } from '@models/orderPageData';
import {
  updateAddress,
  updateCity,
  updatePoint,
} from '@store/reducers/orderDetailsReducer';
import { initialLocationOrderData } from '@utils/constants/store';
import clearIcon from '@assets/svg/clearIcon.svg';
import OrderInputDropdown from '../orderInputDropdown/orderInputDropdown';
import cl from './OrderInput.module.scss';

interface IOrderInputProps {
  label: string;
  type: string;
  placeholder: string;
}

const OrderInput: React.FC<IOrderInputProps> = ({
  label,
  type,
  placeholder,
}) => {
  const dispatch = useAppDispatch();
  const point = useAppSelector((state) => state.orderDetails.point);
  const [inputString, setInputString] =
    type === ELocationInputTypes.CITY
      ? useState(point.cityId.name)
      : useState(point.address);
  const [isFocus, setIsFocus] = useState(false);
  const { data } =
    type === ELocationInputTypes.CITY
      ? needForDriveApi.useGetCitiesListQuery('')
      : needForDriveApi.useGetPointsListQuery('');

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      // Если input с городом пустой, сбрасывает все значения
      if (e.target.value.length === 0) {
        if (type === ELocationInputTypes.CITY) {
          dispatch(updateCity(''));
        }
        dispatch(updateAddress(''));
      }

      setInputString(e.target.value);
    },
    [],
  );

  const focusHandler = useCallback(() => {
    setIsFocus(true);
  }, []);

  const blurHandler = useCallback(() => {
    // Без таймаута не успевает сработать выбор варианта из списка
    setTimeout(() => setIsFocus(false), 200);
  }, []);

  useEffect(() => {
    // Если город становится пустым, пункт выдачи тоже
    if (type === ELocationInputTypes.POINT && point.cityId.name.length === 0) {
      setInputString('');
      updatePoint(initialLocationOrderData);
      dispatch(updateCity(''));
    }
  }, [point.cityId.name]);

  useEffect(() => {
    switch (type) {
      case ELocationInputTypes.CITY: {
        if (point.cityId.name) {
          setInputString(point.cityId.name);
        }
        break;
      }
      case ELocationInputTypes.POINT: {
        if (point.address) {
          setInputString(point.address);
        }
      }

      // no default
    }
  }, [point]);

  return (
    <label htmlFor={`${type}-input`} className={cl.label}>
      <span className={cl.labelText}>{label}</span>
      <Input
        value={inputString}
        onChange={changeHandler}
        onFocus={focusHandler}
        onBlur={blurHandler}
        bordered={false}
        className={cl.input}
        placeholder={placeholder}
        autoComplete="off"
        id={`${type}-input`}
        allowClear={{
          clearIcon: (
            <img
              src={clearIcon}
              className={classnames(cl.clearIcon, {
                [cl.clearIconVisible]: inputString,
              })}
              alt="clear-input"
            />
          ),
        }}
      />
      <OrderInputDropdown
        type={type}
        isFocus={isFocus}
        setString={setInputString}
        inputString={inputString}
        data={data}
      />
    </label>
  );
};

export default OrderInput;
