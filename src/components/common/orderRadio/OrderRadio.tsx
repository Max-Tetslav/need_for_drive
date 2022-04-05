import React from 'react';
import cl from './OrderRadio.module.scss';

interface IOrderRadioProps {
  title: string;
  checked: boolean;
}

const OrderRadio: React.FC<IOrderRadioProps> = ({ title, checked }) => {
  return (
    <label className={cl.label} htmlFor={`${title}-radio`}>
      <input
        className={cl.input}
        type="radio"
        id={`${title}-radio`}
        name="model"
        checked={checked}
      />
      <span className={cl.checkmark} />
      {title}
    </label>
  );
};

export default OrderRadio;
