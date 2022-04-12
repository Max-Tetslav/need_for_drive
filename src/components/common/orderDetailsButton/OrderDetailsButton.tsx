import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/store';
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
  const durationState = useAppSelector(
    (state) => state.orderDetails.options.duration,
  );
  const rateState = useAppSelector(
    (state) => state.orderDetails.options.rateName,
  );

  const navigateTo = useCallback(() => {
    if (location.pathname.includes('model') && modelState.value.model) {
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
  }, [location, pointState.status, modelState.status]);

  useEffect(() => {
    if (location.pathname.includes('place')) {
      setNextStep('Выбрать модель');
    } else if (location.pathname.includes('model')) {
      setNextStep('Дополнительно');
    } else if (location.pathname.includes('options')) {
      setNextStep('Итого');
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname.includes('model') && modelState.value.model) {
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
    modelState.value.model,
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
