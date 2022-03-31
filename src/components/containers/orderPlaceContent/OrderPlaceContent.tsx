import React, { useState } from 'react';
import OrderInput from '@components/common/orderInput/OrderInput';
import Map from '@components/common/map/Map';
import cl from './OrderPlaceContent.module.scss';

const OrderPlaceContent: React.FC = () => {
  const [cityValue, setCityValue] = useState<string>('');
  const [pointValue, setPointValue] = useState<string>('');

  return (
    <section className={cl.container}>
      <div className={cl.pointContainer}>
        <div className={cl.inputContainer}>
          <OrderInput
            type="city"
            label={'Город\xa0\xa0'}
            placeholder="Начните вводить город..."
            value={cityValue}
            setValue={setCityValue}
          />
          <OrderInput
            type="point"
            label={'Пункт выдачи\xa0'}
            placeholder="Начните вводить пункт..."
            value={pointValue}
            setValue={setPointValue}
          />
        </div>
        <p className={cl.mapText}>Выбрать на карте:</p>
        <Map city={cityValue} point={pointValue} />
      </div>

      <div className={cl.orderDetailsContainer}>
        <h3 className={cl.orderDetailsTitle}>Ваш заказ:</h3>
        <div className={cl.orderDetailsItem}>
          <h4 className={cl.orderDetailsItemTitle}>Пункт выдачи</h4>
          <span className={cl.orderDetailsItemDots} />
          <p className={cl.orderDetailsItemContent}>
            {!pointValue ? (
              <>
                <span>Выберите</span>
                <br />
                <span>пункт выдачи авто</span>
              </>
            ) : (
              <>
                <span>{cityValue},</span>
                <br />
                <span>{pointValue}</span>
              </>
            )}
          </p>
        </div>
        <p className={cl.price}>Цена: от 8 000 до 12 000 ₽</p>
        {/* ЕСЛИ ПОЛЯ 'ГОРОД' ИЛИ 'ПУНКТ ВЫДАЧИ' ПУСТЫЕ - КНОПКА DISABLED */}
        <button type="button" className={cl.button} disabled={Boolean(!cityValue || !pointValue)}>
          Выбрать модель
        </button>
      </div>
    </section>
  );
};

export default OrderPlaceContent;
