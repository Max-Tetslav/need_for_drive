import classNames from 'classnames';
import React, { SetStateAction, useCallback } from 'react';
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
