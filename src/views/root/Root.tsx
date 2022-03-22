import React, { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import MenuBtn from '@components/common/menuBtn/MenuBtn';
import MenuContainer from '@components/containers/menuContainer/MenuContainer';
import Aside from '@components/containers/aside/Aside';
import LangSwitcher from '@components/common/langSwitcher/LangSwitcher';

const Root: React.FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const menuBtnHandler = useCallback(() => {
    setIsMenuOpened(!isMenuOpened);
  }, [isMenuOpened]);

  return (
    <>
      <Aside />
      <MenuBtn isActive={isMenuOpened} clickHandler={menuBtnHandler} />
      <LangSwitcher />
      <MenuContainer isOpen={isMenuOpened} />
      <Outlet />
    </>
  );
};

export default Root;
