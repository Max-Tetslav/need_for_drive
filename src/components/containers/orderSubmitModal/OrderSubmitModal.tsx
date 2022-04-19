import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import needForDriveApi from '@services/needForDriveAPI';
import { useAppDispatch, useAppSelector } from '@store/store';
import { updateIsModalShown } from '@store/reducers/orderDetailsReducer';
import cl from './OrderSubmitModal.module.scss';

const OrderSubmitModal: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const orderData = useAppSelector((state) => state.orderDetails);
  const modalState = useAppSelector(
    (state) => state.orderDetails.total.isModalShown,
  );
  const [postOrder, postResponse] = needForDriveApi.usePostOrderMutation();

  const cancelHandler = useCallback(() => {
    dispatch(updateIsModalShown(false));
  }, []);

  const submitHandler = useCallback(() => {
    postOrder({
      orderStatusId: { name: 'new', id: '5e26a191099b810b946c5d89' },
      cityId: orderData.point.cityId,
      pointId: orderData.point,
      carId: orderData.model,
      dateFrom: orderData.options.dateFrom,
      dateTo: orderData.options.dateTo,
      price: orderData.options.finalPrice,
      color: orderData.options.color,
      rateId: orderData.options.rate,
      isFullTank: Boolean(orderData.options.isFullTank),
      isNeedChildChair: Boolean(orderData.options.isNeedChildChair),
      isRightWheel: Boolean(orderData.options.isRightWheel),
    });

    dispatch(updateIsModalShown(false));
  }, [orderData]);

  useEffect(() => {
    if (postResponse.data) {
      navigate(`/order/:${postResponse.data.data.id}`);
    }
  }, [postResponse]);

  return (
    <div className={classNames(cl.container, { [cl.showModal]: modalState })}>
      <div className={cl.contentContainer}>
        <h2 className={cl.text}>Подтвердить заказ</h2>
        <div className={cl.buttonsContainer}>
          <button
            className={classNames(cl.button, cl.submit)}
            onClick={submitHandler}
            type="button"
          >
            Подтвердить
          </button>
          <button
            className={classNames(cl.button, cl.cancel)}
            onClick={cancelHandler}
            type="button"
          >
            Вернуться
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSubmitModal;
