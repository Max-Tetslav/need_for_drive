import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@store/store';
import cl from './TotalContent.module.scss';

const TotalContent: React.FC = () => {
  const orderData = useAppSelector((state) => state.orderDetails);
  const [tank, setTank] = useState<number>();

  useEffect(() => {
    if (orderData.options.isFullTank) {
      setTank(100);
    } else if (orderData.model.tank) {
      setTank(orderData.model.tank);
    } else {
      setTank(35);
    }
  }, []);

  return (
    <div className={cl.container}>
      <div className={cl.infoContainer}>
        <p className={cl.model}>{orderData.model.name}</p>
        {orderData.model.number ? (
          <p className={cl.number}>
            {orderData.model.number
              .replace(/\d{1,}/g, ` $& `)
              .toLocaleUpperCase()}
          </p>
        ) : null}
        <p className={cl.otherText}>
          <strong>Топливо</strong>
          {` ${tank} %`}
        </p>
        <p className={cl.otherText}>
          <strong>{'Доступна с '}</strong>
          {new Date(orderData.options.dateFrom).toLocaleString().slice(0, -3)}
        </p>
      </div>
      <img
        className={cl.img}
        src={orderData.model.thumbnail.path}
        alt="model"
      />
    </div>
  );
};

export default TotalContent;
