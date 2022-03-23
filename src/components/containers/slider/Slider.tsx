import React, { useState, useCallback, useEffect } from 'react';
import ISlide from '@models/sliderData';
import SliderContent from './sliderContent/SliderContent';
import Slide from './slide/Slide';
import SliderNavigation from './sliderNavigation/SliderNavigation';
import SliderPagination from './sliderPagination/SliderPagination';
import cl from './Slider.module.scss';

interface ISliderProps {
  slidesData: ISlide[];
}

const Slider: React.FC<ISliderProps> = ({ slidesData }) => {
  const [activeNum, setActiveNum] = useState<number>(1);
  const [isHover, setIsHover] = useState<boolean>(false);

  const paginationHandler = useCallback(
    (num: number) => {
      setActiveNum(num);
    },
    [activeNum],
  );

  const nextSlide = useCallback(() => {
    if (activeNum < slidesData.length) {
      setActiveNum((currentNum) => currentNum + 1);
    } else {
      setActiveNum(1);
    }
  }, [activeNum]);

  const prevSlide = useCallback(() => {
    if (activeNum > slidesData[0].id) {
      setActiveNum((currentNum) => currentNum - 1);
    } else {
      setActiveNum(slidesData.length);
    }
  }, [activeNum]);

  const autoPlayHandler = useCallback(() => {
    setIsHover((currentState) => !currentState);
  }, [isHover]);

  // useEffect реализует остановку таймаута при hover на слайдере, и запускает таймаут если над слайдером нет курсора

  useEffect(() => {
    if (!isHover) {
      const timeout = setTimeout(function autoPlay() {
        nextSlide();
      }, 5000);
      // сохраняю id таймера в localStorage, чтобы при hover на слайдере текущий таймаут не выполнился
      localStorage.setItem('timeoutId', timeout.toString());
    } else {
      const timerId = Number(localStorage.getItem('timeoutId'));
      clearTimeout(timerId);
    }
  });

  return (
    <div className={cl.container} onMouseEnter={autoPlayHandler} onMouseLeave={autoPlayHandler}>
      <SliderContent>
        {slidesData.map((slide) => (
          <Slide
            key={slide.id}
            title={slide.title}
            isActive={activeNum === slide.id}
            description={slide.description}
            buttonColor={slide.color}
            imgUrl={slide.img}
          />
        ))}
        <SliderNavigation direction="left" handleClick={prevSlide} />
        <SliderNavigation direction="right" handleClick={nextSlide} />
      </SliderContent>

      <SliderPagination slides={slidesData} activeSlide={activeNum} clickHandler={paginationHandler} />
    </div>
  );
};

export default Slider;
