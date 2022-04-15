import React, { useCallback } from 'react';
import classNames from 'classnames';
import needForDriveApi from '@services/needForDriveAPI';
import { useAppDispatch, useAppSelector } from '@store/store';
import { updateIsModalShown } from '@store/reducers/orderDetailsReduces';
import cl from './OrderSubmitModal.module.scss';

const OrderSubmitModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const orderData = useAppSelector((state) => state.orderDetails);
  const modalState = useAppSelector(
    (state) => state.orderDetails.total.isModalShown,
  );
  const [postOrder] = needForDriveApi.usePostOrderMutation();

  const cancelHandler = useCallback(() => {
    dispatch(updateIsModalShown(false));
  }, []);

  const submitHandler = useCallback(() => {
    postOrder({
      orderStatusId: { name: 'new', id: '5e26a191099b810b946c5d89' },
      cityId: orderData.point.orderData.cityId,
      pointId: orderData.point.orderData,
      carId: orderData.model.value,
      dateFrom: orderData.options.dateFrom,
      dateTo: orderData.options.dateTo,
      price: orderData.options.finalPrice,
    });

    dispatch(updateIsModalShown(false));
  }, [orderData]);

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
