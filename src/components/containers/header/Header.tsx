import React, { MouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearOrderData } from '@store/reducers/orderDetailsReducer';
import { useAppDispatch } from '@store/store';
import Geolocation from '@components/common/geolocation/Geolocation';
import cl from './Header.module.scss';

interface IProps {
  headerClass: string;
}

const Header: React.FC<IProps> = ({ headerClass }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const clickHandler = useCallback((e: MouseEvent) => {
    e.preventDefault();
    dispatch(clearOrderData());
    navigate('/');
  }, []);

  return (
    <header className={headerClass}>
      <a className={cl.title} href="/" onClick={clickHandler}>
        Need for drive
      </a>
      <Geolocation />
    </header>
  );
};

export default Header;
