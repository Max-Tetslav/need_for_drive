import React, { useCallback } from 'react';
import classnames from 'classnames';
import {
  updateColor,
  updateColorId,
  updateModel,
  updateModelStatus,
} from '@store/reducers/orderDetailsReducer';
import { useAppDispatch, useAppSelector } from '@store/store';
import { ICar } from '@models/orderPageData';
import formatPrice from '@utils/helpers/formatPrice';
import cl from './CarModelCard.module.scss';

interface ICarModelCardProps {
  id: string;
  car: ICar;
}

const CarModelCard: React.FC<ICarModelCardProps> = ({ id, car }) => {
  const dispatch = useAppDispatch();
  const currentColor = useAppSelector(
    (state) => state.orderDetails.options.color,
  );
  const currentModelId = useAppSelector(
    (state) => state.orderDetails.model.value.id,
  );

  const changeHandler = useCallback(() => {
    dispatch(updateModelStatus(true));
    dispatch(updateModel(car));

    if (currentColor) {
      dispatch(updateColor(''));
      dispatch(updateColorId(''));
    }
  }, []);

  return (
    <div
      className={classnames(cl.container, {
        [cl.activeItem]: id === currentModelId,
      })}
      role="radio"
      onClick={changeHandler}
      onKeyPress={() => null}
      aria-checked={id === currentModelId}
      aria-labelledby="model"
      tabIndex={0}
    >
      <h4 className={cl.title}>
        {car.name}
        <p className={cl.price}>
          {formatPrice(car.priceMin)} - {formatPrice(car.priceMax)} ₽
        </p>
      </h4>
      <img className={cl.img} src={car.thumbnail.path} alt={car.name} />
    </div>
  );
};

export default CarModelCard;
