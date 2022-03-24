import React, { useCallback } from 'react';
import classnames from 'classnames';
import { Input } from 'antd';
import clearIcon from '@assets/svg/clearIcon.svg';
import cl from './OrderInput.module.scss';

interface IProps {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const OrderInput: React.FC<IProps> = ({ label, id, placeholder, value, setValue }) => {
  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setValue(e.target.value);
    },
    [value],
  );

  return (
    <label htmlFor={`${id}-input`} className={cl.label}>
      <span className={cl.labelText}>{label}</span>
      <Input
        value={value}
        onChange={changeHandler}
        bordered={false}
        className={cl.input}
        placeholder={placeholder}
        id={`${id}-input`}
        allowClear={{
          clearIcon: (
            <img src={clearIcon} className={classnames(cl.clearIcon, { [cl.clearIconVisible]: value })} alt="clear-input" />
          ),
        }}
      />
    </label>
  );
};

export default OrderInput;
