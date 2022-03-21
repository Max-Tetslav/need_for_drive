import React, { memo, useState } from 'react';
import leftArrow from '@assets/svg/leftArrow.svg';
import rightArrow from '@assets/svg/rightArrow.svg';
import cl from './SliderNavigation.module.scss';

interface IProps {
  direction: 'right' | 'left';
  handleClick: () => void;
}

const SliderNavigation: React.FC<IProps> = ({ direction, handleClick }) => {
  const [classes] = useState<string>(
    direction === 'right' ? [cl.arrow, cl.rightArrow].join(' ') : [cl.arrow, cl.leftArrow].join(' '),
  );

  return (
    <button onClick={handleClick} className={classes} type="button">
      <img className={cl.img} src={direction === 'right' ? rightArrow : leftArrow} alt={`${direction}-arrow`} />
    </button>
  );
};

export default memo(SliderNavigation);
