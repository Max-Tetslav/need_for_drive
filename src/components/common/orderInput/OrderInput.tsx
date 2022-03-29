import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import { Input } from 'antd';
import clearIcon from '@assets/svg/clearIcon.svg';
import OrderInputDropdown from '../orderInputDropdown/orderInputDropdown';
import cl from './OrderInput.module.scss';

interface IOrderInputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const OrderInput: React.FC<IOrderInputProps> = ({ label, type, placeholder, value, setValue }) => {
  const [inputString, setInputString] = useState('');

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setInputString(e.target.value);
    },
    [inputString],
  );

  return (
    <label htmlFor={`${type}-input`} className={cl.label}>
      <span className={cl.labelText}>{label}</span>
      <Input
        value={inputString}
        onChange={changeHandler}
        bordered={false}
        className={cl.input}
        placeholder={placeholder}
        id={`${type}-input`}
        allowClear={{
          clearIcon: (
            <img src={clearIcon} className={classnames(cl.clearIcon, { [cl.clearIconVisible]: inputString })} alt="clear-input" />
          ),
        }}
      />
      <OrderInputDropdown setValue={setValue} value={inputString} type={type} />
    </label>
  );
};

export default OrderInput;
