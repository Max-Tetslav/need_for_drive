import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Input } from 'antd';
import { useAppDispatch } from '@store/store';
import {
  updateDateFrom,
  updateDateTo,
  updateDuration,
} from '@store/reducers/orderDetailsReduces';
import clearIcon from '@assets/svg/clearIcon.svg';
import cl from './OptionsDateGroup.module.scss';

const OptionsDateGroup: React.FC = () => {
  const dispatch = useAppDispatch();
  const placeholder = 'Введите дату и время';
  const actualDate = new Date();
  const formatedDate = actualDate
    .toLocaleDateString()
    .split('.')
    .reverse()
    .join('-');
  const formatedTime = actualDate
    .toLocaleTimeString()
    .split(':')
    .slice(0, 2)
    .join(':');
  const [dateFrom, setDateFrom] = useState(`${formatedDate}T${formatedTime}`);
  const [dateTo, setDateTo] = useState('');

  const setDate = useCallback(() => {
    if (dateFrom && dateTo) {
      const dateFromTime = new Date(dateFrom).getTime();
      const dateToTime = new Date(dateTo).getTime();

      const duration = dateToTime - dateFromTime;
      const mins = duration / 1000 / 60;
      const fullMins = mins % 60;
      const hours = mins / 60;
      const fullHours = Math.floor(hours % 24);
      const days = Math.floor(hours / 24);

      dispatch(updateDateFrom(dateFromTime));
      dispatch(updateDateTo(dateToTime));
      dispatch(updateDuration(`${days}д ${fullHours}ч ${fullMins}мин`));
    } else {
      dispatch(updateDateFrom(0));
      dispatch(updateDateTo(0));
      dispatch(updateDuration(''));
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    setDate();
  }, [setDate]);

  return (
    <div className={cl.container}>
      <h4 className={cl.title}>Дата аренды</h4>
      <div className={cl.dateGroup}>
        <label className={cl.label} htmlFor="dateFrom-input">
          <span className={cl.labelText}>{`C `}</span>
          <Input
            value={dateFrom}
            type="datetime-local"
            bordered={false}
            className={cl.input}
            placeholder={placeholder}
            autoComplete="off"
            onChange={(e) => setDateFrom(e.target.value)}
            id="dateFrom-input"
            allowClear={{
              clearIcon: (
                <img
                  src={clearIcon}
                  className={classnames(cl.clearIcon, {
                    [cl.clearIconVisible]: dateFrom,
                  })}
                  alt="clear-input"
                />
              ),
            }}
          />
        </label>
        <label className={cl.label} htmlFor="dateTo-input">
          <span className={cl.labelText}>{`По `}</span>
          <Input
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            type="datetime-local"
            bordered={false}
            className={cl.input}
            placeholder={placeholder}
            autoComplete="off"
            id="dateTo-input"
            allowClear={{
              clearIcon: (
                <img
                  src={clearIcon}
                  className={classnames(cl.clearIcon, {
                    [cl.clearIconVisible]: dateTo,
                  })}
                  alt="clear-input"
                />
              ),
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default OptionsDateGroup;
