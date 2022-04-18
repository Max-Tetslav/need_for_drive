import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '@store/store';
import {
  updateDateFrom,
  updateDateTo,
  updateDuration,
} from '@store/reducers/orderDetailsReducer';
import getDurationString from '@utils/helpers/getDurationString';
import clearIcon from '@assets/svg/clearIcon.svg';
import getCalendarDateFormat from '@utils/helpers/getCalendarDateFormat';
import cl from './OptionsDateGroup.module.scss';

const OptionsDateGroup: React.FC = () => {
  const dispatch = useAppDispatch();
  const placeholder = 'Введите дату и время';
  const dateFromState = useAppSelector(
    (state) => state.orderDetails.options.dateFrom,
  ) as number;
  const dateToState = useAppSelector(
    (state) => state.orderDetails.options.dateTo,
  ) as number;
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    if (dateFromState) {
      setDateFrom(getCalendarDateFormat(dateFromState));
    } else {
      setDateFrom(getCalendarDateFormat());
    }
  }, []);

  useEffect(() => {
    if (dateToState) {
      setDateTo(getCalendarDateFormat(dateToState));
    }
  }, [dateToState]);

  const setDate = useCallback(() => {
    if (dateFrom && dateTo) {
      const dateFromTime = new Date(dateFrom).getTime();
      const dateToTime = new Date(dateTo).getTime();

      dispatch(updateDateFrom(dateFromTime));
      dispatch(updateDateTo(dateToTime));
      dispatch(updateDuration(getDurationString(dateFromTime, dateToTime)));
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
