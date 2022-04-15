import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/store';
import { updateIsModalShown } from '@store/reducers/orderDetailsReduces';
import {
  completeModel,
  completeOptions,
  updateCurrentModel,
  updateCurrentOptions,
} from '@store/reducers/breadcrumbReducer';
import cl from './OrderDetailsButton.module.scss';

const OrderDetailsButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [nextStep, setNextStep] = useState('Выбрать модель');
  const [isDisabled, setIsDisabled] = useState(true);
  const pointState = useAppSelector((state) => state.orderDetails.point);
  const modelState = useAppSelector((state) => state.orderDetails.model);
  const optionsState = useAppSelector(
    (state) => state.orderDetails.options.finalPrice,
  );
  const durationState = useAppSelector(
    (state) => state.orderDetails.options.duration,
  );
  const rateState = useAppSelector(
    (state) => state.orderDetails.options.rateName,
  );

  const navigateTo = useCallback(() => {
    if (location.pathname.includes('total')) {
      dispatch(updateIsModalShown(true));
    } else if (location.pathname.includes('options') && optionsState) {
      navigate('/order/total');
    } else if (location.pathname.includes('model') && modelState.value.name) {
      navigate('/order/options');
      dispatch(updateCurrentOptions(true));
      dispatch(completeOptions(true));
    } else if (
      location.pathname.includes('place') &&
      pointState.value.address
    ) {
      navigate('/order/model');
      dispatch(updateCurrentModel(true));
      dispatch(completeModel(true));
      setIsDisabled(true);
    }
  }, [location, pointState.status, modelState.status, optionsState]);

  useEffect(() => {
    if (location.pathname.includes('place')) {
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
    if (location.pathname.includes('total')) {
      setIsDisabled(false);
    } else if (location.pathname.includes('model') && modelState.value.name) {
      setIsDisabled(false);
    } else if (
      location.pathname.includes('place') &&
      pointState.value.address
    ) {
      setIsDisabled(false);
    } else if (
      location.pathname.includes('options') &&
      durationState &&
      rateState
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [
    location,
    pointState.value.address,
    modelState.value,
    durationState,
    rateState,
  ]);

  return (
    <button
      type="button"
      className={cl.button}
      disabled={isDisabled}
      onClick={navigateTo}
    >
      {nextStep}
    </button>
  );
};

export default OrderDetailsButton;
