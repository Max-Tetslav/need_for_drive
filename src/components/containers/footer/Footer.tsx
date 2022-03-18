import React from 'react';
import cl from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={cl.footer}>
      <p className={cl.copyRight}>© 2016-2019 «Need for drive»</p>
      <a className={cl.phoneLink} href="tel: +74952342244">
        8 (495) 234-22-44
      </a>
    </footer>
  );
};

export default Footer;
