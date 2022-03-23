import React from 'react';
import pin from '@assets/svg/geopin.svg';
import cl from './Geolocation.module.scss';

const Geolocation: React.FC = () => {
  return (
    <div className={cl.container}>
      <img className={cl.img} src={pin} alt="pin" />
      <p className={cl.text}>Ульяновск</p>
    </div>
  );
};

export default Geolocation;
