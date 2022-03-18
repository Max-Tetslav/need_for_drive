import React from 'react';
import TelegramIcon from '@components/icons/TelegramIcon';
import FacebookIcon from '@components/icons/FacebookIcon';
import InstagramIcon from '@components/icons/InstagramIcon';
import cl from './MenuContainer.module.scss';

interface IProps {
  isOpen: boolean;
}

const MenuContainer: React.FC<IProps> = ({ isOpen }) => {
  return (
    <div className={isOpen ? [cl.menuContainer, cl.activeMenu].join(' ') : cl.menuContainer}>
      <div className={cl.navContainer}>
        <nav className={cl.nav}>
          <ul className={cl.linkMenu}>
            <li>
              <a className={cl.link} href="/">
                ПАРКОВКА
              </a>
            </li>
            <li>
              <a className={cl.link} href="/">
                СТРАХОВКА
              </a>
            </li>
            <li>
              <a className={cl.link} href="/">
                БЕНЗИН
              </a>
            </li>
            <li>
              <a className={cl.link} href="/">
                ОБСЛУЖИВАНИЕ
              </a>
            </li>
          </ul>
          <ul className={cl.mediaMenu}>
            <li>
              <a className={cl.mediaLink} href="/">
                <TelegramIcon />
              </a>
            </li>
            <li>
              <a className={cl.mediaLink} href="/">
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a className={cl.mediaLink} href="/">
                <InstagramIcon />
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className={cl.transparent} />
    </div>
  );
};

export default MenuContainer;
