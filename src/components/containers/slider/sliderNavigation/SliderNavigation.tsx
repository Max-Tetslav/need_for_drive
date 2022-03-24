import React, { memo } from 'react';
import classnames from 'classnames';
import leftArrow from '@assets/svg/leftArrow.svg';
import rightArrow from '@assets/svg/rightArrow.svg';
import cl from './SliderNavigation.module.scss';

interface ISliderNavigationProps {
  direction: 'right' | 'left';
  handleClick: () => void;
}

const SliderNavigation: React.FC<ISliderNavigationProps> = ({ direction, handleClick }) => {
  const classes = classnames(cl.arrow, {
    [cl.rightArrow]: direction === 'right',
    [cl.leftArrow]: direction === 'left',
  });

  return (
    <button onClick={handleClick} className={classes} type="button">
      <img className={cl.img} src={direction === 'right' ? rightArrow : leftArrow} alt={`${direction}-arrow`} />
    </button>
  );
};

export default memo(SliderNavigation);
