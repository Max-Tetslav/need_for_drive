import React from 'react';
import Geolocation from '@components/common/geolocation/Geolocation';
import cl from './Header.module.scss';

interface IProps {
  headerClass: string;
}

const Header: React.FC<IProps> = ({ headerClass }) => {
  return (
    <header className={headerClass}>
      <h1 className={cl.title}>Need for drive</h1>
      <Geolocation />
    </header>
  );
};

export default Header;
