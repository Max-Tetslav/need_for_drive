import React from 'react';
import classnames from 'classnames';
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
      className={classnames(cl.btn, { [cl.activeBtn]: isActive })}
      onClick={clickHandler}
    >
      <span />
    </button>
  );
};

export default MenuBtn;
