import React, { MouseEvent, useCallback } from 'react';
import Geolocation from '@components/common/geolocation/Geolocation';
import { useNavigate } from 'react-router-dom';
import cl from './Header.module.scss';

interface IProps {
  headerClass: string;
}

const Header: React.FC<IProps> = ({ headerClass }) => {
  const navigate = useNavigate();
  const clickHandler = useCallback((e: MouseEvent) => {
    e.preventDefault();
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
