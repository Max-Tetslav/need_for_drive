import React from 'react';
import cl from './MenuBtn.module.scss';

interface IMenuBtnProps {
  isActive: boolean;
  clickHandler: () => void;
}

const MenuBtn: React.FC<IMenuBtnProps> = ({ isActive, clickHandler }) => {
  return (
    <button
      type="button"
      aria-label="menu"
      className={isActive ? [cl.btn, cl.activeBtn].join(' ') : cl.btn}
      onClick={clickHandler}
    >
      <span />
    </button>
  );
};

export default MenuBtn;
