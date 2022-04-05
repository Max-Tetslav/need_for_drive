import React, { useCallback } from 'react';
import classnames from 'classnames';
import ISlide from '@models/sliderData';
import cl from './SliderPagination.module.scss';

interface IBulletProps {
  isActive: boolean;
  id: number;
  setSlide: (num: number) => void;
}

const Bullet: React.FC<IBulletProps> = ({ isActive, setSlide, id }) => {
  const classes = classnames(cl.bullet, { [cl.activeBullet]: isActive });

  const handler = useCallback(() => {
    // из props получаем id выбранного bullet, и устанавливаем новый активный слайд функцией setState из props
    setSlide(id);
  }, []);

  return (
    <button
      onClick={handler}
      className={classes}
      type="button"
      aria-label="bullet"
    />
  );
};

interface ISliderPaginationProps {
  slides: ISlide[];
  activeSlide: number;
  clickHandler: (num: number) => void;
}

const SliderPagination: React.FC<ISliderPaginationProps> = ({
  slides,
  activeSlide,
  clickHandler,
}) => {
  return (
    <div className={cl.bulletsContainer}>
      {slides.map((slide) => (
        <Bullet
          key={slide.id}
          isActive={activeSlide === slide.id}
          id={slide.id}
          setSlide={clickHandler}
        />
      ))}
    </div>
  );
};

export default SliderPagination;
