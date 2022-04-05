import { completeModel, completeOptions, updateCurrentModel, updateCurrentOptions } from '@store/reducers/breadcrumbReducer';
import { useAppDispatch, useAppSelector } from '@store/store';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './OrderDetailsButton.module.scss';

const OrderDetailsButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    if (modelState.status) {
      navigate('/order/options');
      dispatch(updateCurrentOptions(true));
      dispatch(completeOptions(true));
    } else if (pointState.status) {
      navigate('/order/model');
      dispatch(updateCurrentModel(true));
      dispatch(completeModel(true));
      setIsDisabled(true);
      setNextStep('Дополнительно');
    }
  }, [pointState.status, modelState.status]);

  useEffect(() => {
    if (modelState.status) {
      setIsDisabled(false);
    } else if (pointState.status) {
      setIsDisabled(false);
    }
  }, [pointState.status, modelState.status]);

  return (
    <button type="button" className={cl.button} disabled={isDisabled} onClick={navigateTo}>
      {nextStep}
    </button>
  );
};

export default OrderDetailsButton;
