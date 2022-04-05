import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Input } from 'antd';
import clearIcon from '@assets/svg/clearIcon.svg';
import needForDriveApi from '@services/needForDriveAPI';
import { useAppDispatch, useAppSelector } from '@store/store';
import { DEFAULT_CITY } from '@utils/constants/locationData';
import { ELocationInputTypes } from '@models/orderPageData';
import { updateAddress, updateCity, updatePointStatus } from '@store/reducers/orderDetailsReduces';
import OrderInputDropdown from '../orderInputDropdown/orderInputDropdown';
import cl from './OrderInput.module.scss';

interface IOrderInputProps {
  label: string;
  type: string;
  placeholder: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const OrderInput: React.FC<IOrderInputProps> = ({ label, type, placeholder, setValue }) => {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.orderDetails.point.value.city);
  const currentAddress = useAppSelector((state) => state.orderDetails.point.value.address);

  const [inputString, setInputString] = type === ELocationInputTypes.CITY ? useState(currentCity) : useState(currentAddress);
  const [isFocus, setIsFocus] = useState(false);
  const { data } =
    type === ELocationInputTypes.CITY ? needForDriveApi.useGetCitiesListQuery('') : needForDriveApi.useGetPointsListQuery('');

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      // Если input с городом пустой, сбрасывает все значения
      if (e.target.value.length === 0) {
        if (type === ELocationInputTypes.CITY) {
          dispatch(updateCity(''));
        }
        setValue('');
        dispatch(updateAddress(''));
        dispatch(updatePointStatus(false));
      }

      setInputString(e.target.value);
    },
    [inputString],
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
    if (type === ELocationInputTypes.POINT && currentCity.length === 0) {
      setValue('');
      setInputString('');
      dispatch(updateCity(''));
      dispatch(updateAddress(''));
      dispatch(updatePointStatus(false));
    }
  }, [currentCity]);

  useEffect(() => {
    // Устанавливает город по умолчанию
    if (type === ELocationInputTypes.CITY) {
      setValue(DEFAULT_CITY);
    }
  }, []);

  useEffect(() => {
    switch (type) {
      case ELocationInputTypes.CITY: {
        if (currentCity) {
          setValue(currentCity);
        }
        break;
      }
      case ELocationInputTypes.POINT: {
        if (currentAddress) {
          setValue(currentAddress);
        }
      }

      // no default
    }
  }, []);

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
            <img src={clearIcon} className={classnames(cl.clearIcon, { [cl.clearIconVisible]: inputString })} alt="clear-input" />
          ),
        }}
      />
      <OrderInputDropdown
        type={type}
        setValue={setValue}
        isFocus={isFocus}
        setString={setInputString}
        inputString={inputString}
        data={data}
      />
    </label>
  );
};

export default OrderInput;
