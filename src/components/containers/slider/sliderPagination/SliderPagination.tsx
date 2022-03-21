import React, { useCallback, useEffect, useState } from 'react';
import ISlide from '@models/sliderData';
import cl from './SliderPagination.module.scss';

interface IProps {
  isActive: boolean;
  id: number;
  setSlide: (num: number) => void;
}

const Bullet: React.FC<IProps> = ({ isActive, setSlide, id }) => {
  const [classes, setClasses] = useState<string>(isActive ? [cl.bullet, cl.activeBullet].join(' ') : cl.bullet);

  useEffect(() => {
    setClasses(isActive ? [cl.bullet, cl.activeBullet].join(' ') : cl.bullet);
  });

  const handler = useCallback(() => {
    // из props получаем id выбранного bullet, и устанавливаем новый активный слайд функцией setState из props
    setSlide(id);
  }, []);

  return <button onClick={handler} className={classes} type="button" aria-label="bullet" />;
};

interface IPropsPagination {
  slides: ISlide[];
  activeSlide: number;
  clickHandler: (num: number) => void;
}

const SliderPagination: React.FC<IPropsPagination> = ({ slides, activeSlide, clickHandler }) => {
  return (
    <div className={cl.bulletsContainer}>
      {slides.map((slide) => (
        <Bullet key={slide.id} isActive={activeSlide === slide.id} id={slide.id} setSlide={clickHandler} />
      ))}
    </div>
  );
};

export default SliderPagination;
