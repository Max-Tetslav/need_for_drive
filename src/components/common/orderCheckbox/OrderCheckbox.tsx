import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@store/store';
import {
  updateIsFullTank,
  updateIsNeedChildChair,
  updateIsRightWheel,
} from '@store/reducers/orderDetailsReducer';
import cl from './OrderCheckbox.module.scss';

interface IOrderCheckboxProps {
  title: string;
  type: string;
  id: string;
}

const OrderCheckbox: React.FC<IOrderCheckboxProps> = ({ title, type, id }) => {
  const dispatch = useAppDispatch();
  const optionsData = useAppSelector((state) => state.orderDetails.options);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    switch (type) {
      case 'tank': {
        setIsChecked(Boolean(optionsData.isFullTank));
        break;
      }
      case 'chair': {
        setIsChecked(Boolean(optionsData.isNeedChildChair));
        break;
      }
      case 'wheel': {
        setIsChecked(Boolean(optionsData.isRightWheel));
        break;
      }

      // no default
    }
  }, []);

  const changeHandler = useCallback(() => {
    switch (type) {
      case 'tank': {
        dispatch(updateIsFullTank(!isChecked));
        break;
      }
      case 'chair': {
        dispatch(updateIsNeedChildChair(!isChecked));
        break;
      }
      case 'wheel': {
        dispatch(updateIsRightWheel(!isChecked));
        break;
      }

      // no default
    }

    setIsChecked((state) => !state);
  }, [isChecked]);

  return (
    <label
      className={classNames(cl.label, { [cl.selected]: isChecked })}
      htmlFor={id}
    >
      {title}
      <input
        className={cl.input}
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={changeHandler}
      />
      <span className={cl.checkmark} />
    </label>
  );
};

export default OrderCheckbox;
