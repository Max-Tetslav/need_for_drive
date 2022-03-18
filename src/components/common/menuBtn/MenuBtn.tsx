import React from 'react';
import cl from './MenuBtn.module.scss';

interface IProps {
  isActive: boolean;
  clickHandler: () => void;
}

const MenuBtn: React.FC<IProps> = ({ isActive, clickHandler }) => {
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
