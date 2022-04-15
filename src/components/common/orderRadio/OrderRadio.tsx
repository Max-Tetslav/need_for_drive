import React, { SetStateAction, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { updateColorId } from '@store/reducers/orderDetailsReducer';
import { useAppDispatch, useAppSelector } from '@store/store';
import { ERadioGroupNames } from '@models/orderPageData';
import cl from './OrderRadio.module.scss';

interface IOrderRadioProps {
  title: string;
  id: string;
  groupName: string;
  checkedId: string;
  setFilterId: React.Dispatch<SetStateAction<string>>;
}

const OrderRadio: React.FC<IOrderRadioProps> = ({
  title,
  id,
  setFilterId,
  checkedId,
  groupName,
}) => {
  const dispatch = useAppDispatch();
  const colorState = useAppSelector(
    (state) => state.orderDetails.options.color,
  );
  const rateState = useAppSelector((state) => state.orderDetails.options.rate);

  useEffect(() => {
    switch (groupName) {
      case ERadioGroupNames.RATE:
        if (rateState.rateTypeId) {
          setFilterId(rateState.rateTypeId.id);
        }
        break;
      case ERadioGroupNames.COLOR:
        if (id !== 'anyColor' && colorState === title) {
          dispatch(updateColorId(id));
        }
        break;

      // no default
    }
  }, [colorState, rateState]);

  const changeHandler = useCallback(() => {
    setFilterId(id);
  }, [checkedId]);

  return (
    <label
      className={classNames(cl.label, { [cl.selected]: checkedId === id })}
      htmlFor={`${title}-radio`}
    >
      <input
        className={cl.input}
        type="radio"
        id={`${title}-radio`}
        name={groupName}
        checked={checkedId === id}
        onChange={changeHandler}
      />
      <span className={cl.checkmark} />
      {title}
    </label>
  );
};

export default OrderRadio;
