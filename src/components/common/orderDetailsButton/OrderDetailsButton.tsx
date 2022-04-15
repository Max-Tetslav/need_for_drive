import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@store/store';
import { updateIsModalShown } from '@store/reducers/orderDetailsReducer';
import cl from './OrderDetailsButton.module.scss';

const OrderDetailsButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [nextStep, setNextStep] = useState('Выбрать модель');
  const [isDisabled, setIsDisabled] = useState(true);
  const isFullOrder = location.pathname.includes(':');
  const pointState = useAppSelector((state) => state.orderDetails.point);
  const modelState = useAppSelector((state) => state.orderDetails.model);
  const priceState = useAppSelector(
    (state) => state.orderDetails.options.finalPrice,
  );

  const clickHandler = useCallback(() => {
    if (location.pathname.includes('total')) {
      dispatch(updateIsModalShown(true));
    } else if (location.pathname.includes('options')) {
      navigate('/order/total');
    } else if (location.pathname.includes('model')) {
      navigate('/order/options');
    } else if (location.pathname.includes('place')) {
      navigate('/order/model');
    }
  }, [location]);

  useEffect(() => {
    if (isFullOrder) {
      setNextStep('Отменить');
    } else if (location.pathname.includes('place')) {
      setNextStep('Выбрать модель');
    } else if (location.pathname.includes('model')) {
      setNextStep('Дополнительно');
    } else if (location.pathname.includes('options')) {
      setNextStep('Итого');
    } else {
      setNextStep('Заказать');
    }
  }, [location]);

  useEffect(() => {
    if (isFullOrder) {
      setIsDisabled(false);
    } else if (location.pathname.includes('total')) {
      setIsDisabled(false);
    } else if (location.pathname.includes('model') && modelState.value.name) {
      setIsDisabled(false);
    } else if (
      location.pathname.includes('place') &&
      pointState.orderData.address
    ) {
      setIsDisabled(false);
    } else if (location.pathname.includes('options') && priceState) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [location, pointState.orderData.address, modelState.value, priceState]);

  return (
    <button
      type="button"
      className={classNames(cl.button, { [cl.cancel]: isFullOrder })}
      disabled={isDisabled}
      onClick={clickHandler}
    >
      {nextStep}
    </button>
  );
};

export default OrderDetailsButton;
