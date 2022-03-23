import React from 'react';
import Geolocation from '@components/common/geolocation/Geolocation';
import cl from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={cl.header}>
      <h1 className={cl.title}>Need for drive</h1>
      <Geolocation />
    </header>
  );
};

export default Header;
