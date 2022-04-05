import React, { useCallback } from 'react';
import classnames from 'classnames';
import { updateModel, updateModelId, updateModelStatus } from '@store/reducers/orderDetailsReduces';
import { useAppDispatch, useAppSelector } from '@store/store';
import cl from './CarModelCard.module.scss';

interface ICarModelCardProps {
  id: string;
  title: string;
  minPrice: number;
  maxPrice: number;
  img: string;
}

const CarModelCard: React.FC<ICarModelCardProps> = ({ id, title, minPrice, maxPrice, img }) => {
  const dispatch = useAppDispatch();
  const currentModelId = useAppSelector((state) => state.orderDetails.model.value.id);

  const formatPrice = (price: number): string => {
    let formatedPrice = price.toString();

    switch (formatedPrice.length) {
      case 6: {
        const firstPart = formatedPrice.slice(0, 3);
        const secondPart = formatedPrice.slice(3);

        formatedPrice = `${firstPart} ${secondPart}`;
        break;
      }
      case 5: {
        const firstPart = formatedPrice.slice(0, 2);
        const secondPart = formatedPrice.slice(2);

        formatedPrice = `${firstPart} ${secondPart}`;
        break;
      }
      // no default
    }

    return formatedPrice;
  };

  const changeHandler = useCallback(() => {
    dispatch(updateModelStatus(true));
    dispatch(updateModel(title));
    dispatch(updateModelId(id));
  }, []);

  return (
    <div
      className={classnames(cl.container, { [cl.activeItem]: id === currentModelId })}
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
