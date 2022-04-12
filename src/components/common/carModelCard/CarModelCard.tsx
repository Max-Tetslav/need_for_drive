import React, { useCallback } from 'react';
import classnames from 'classnames';
import {
  updateModel,
  updateModelColorsList,
  updateModelId,
  updateModelMaxPrice,
  updateModelMinPrice,
  updateModelStatus,
} from '@store/reducers/orderDetailsReduces';
import { useAppDispatch, useAppSelector } from '@store/store';
import formatPrice from '@utils/helpers/formatPrice';
import cl from './CarModelCard.module.scss';

interface ICarModelCardProps {
  id: string;
  title: string;
  minPrice: number;
  maxPrice: number;
  img: string;
  colors: string[];
}

const CarModelCard: React.FC<ICarModelCardProps> = ({
  id,
  title,
  minPrice,
  maxPrice,
  img,
  colors,
}) => {
  const dispatch = useAppDispatch();
  const currentModelId = useAppSelector(
    (state) => state.orderDetails.model.value.id,
  );

  const changeHandler = useCallback(() => {
    dispatch(updateModelStatus(true));
    dispatch(updateModel(title));
    dispatch(updateModelId(id));
    dispatch(updateModelMaxPrice(maxPrice));
    dispatch(updateModelMinPrice(minPrice));
    dispatch(updateModelColorsList(colors));
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
        {title}
        <p className={cl.price}>
          {formatPrice(minPrice)} - {formatPrice(maxPrice)} ₽
        </p>
      </h4>
      <img className={cl.img} src={img} alt={title} />
    </div>
  );
};

export default CarModelCard;
