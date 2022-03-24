import React, { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import MenuBtn from '@components/common/menuBtn/MenuBtn';
import MenuContainer from '@components/containers/menuContainer/MenuContainer';
import Aside from '@components/containers/aside/Aside';

const Root: React.FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const menuBtnHandler = useCallback(() => {
    setIsMenuOpened((isOpened) => !isOpened);
  }, [isMenuOpened]);

  return (
    <>
      <Aside />
      <MenuBtn isActive={isMenuOpened} clickHandler={menuBtnHandler} />
      <MenuContainer isOpen={isMenuOpened} />
      <Outlet />
    </>
  );
};

export default Root;
