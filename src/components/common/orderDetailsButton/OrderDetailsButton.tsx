import React, { useCallback, useEffect, useState } from 'react';
import {
  completeModel,
  completeOptions,
  updateCurrentModel,
  updateCurrentOptions,
} from '@store/reducers/breadcrumbReducer';
import { useAppDispatch, useAppSelector } from '@store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import cl from './OrderDetailsButton.module.scss';

const OrderDetailsButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const pointState = useAppSelector((state) => state.orderDetails.point);
  const modelState = useAppSelector((state) => state.orderDetails.model);
  // let colorState;
  // let durationState;
  // let rateState;
  // let isFullOil;
  // let isChildSeat;
  // let isRightWheel;

  const [nextStep, setNextStep] = useState('Выбрать модель');
  const [isDisabled, setIsDisabled] = useState(true);

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
    } else {
      setIsDisabled(true);
    }
  }, [location, pointState.value.address, modelState.value.model]);

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
