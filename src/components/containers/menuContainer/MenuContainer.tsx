import React from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames/bind';
import socialMediaData from '@utils/constants/socialMediaData';
import menuData from '@utils/constants/menuData';
import LangSwitcher from '@components/common/langSwitcher/LangSwitcher';
import cl from './MenuContainer.module.scss';

interface IMenuContainerProps {
  isOpen: boolean;
}

const MenuContainer: React.FC<IMenuContainerProps> = ({ isOpen }) => {
  const location = useLocation();
  const isOrderPage = location.pathname.includes('order');

  return (
    <div className={classnames(cl.menuContainer, { [cl.activeMenu]: isOpen })}>
      <LangSwitcher className={cl.langSwitcherMobile} />
      <div className={cl.navContainer}>
        <nav className={cl.nav}>
          <ul className={cl.linkMenu}>
            {menuData.map((item) => {
              return (
                <li key={item.id}>
                  <a className={cl.link} href={item.path}>
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
          <ul className={cl.mediaMenu}>
            {socialMediaData.map((item) => {
              return (
                <li key={item.id}>
                  <a className={cl.mediaLink} href="/">
                    {item.icon}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div
        className={classnames(cl.transparent, {
          [cl.noTransparent]: isOrderPage,
        })}
      />
    </div>
  );
};

export default MenuContainer;
