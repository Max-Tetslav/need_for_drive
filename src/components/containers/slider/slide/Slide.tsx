import React, { memo, useEffect, useState } from 'react';
import cl from './Slide.module.scss';

interface IProps {
  imgUrl: string;
  title: string;
  description: string;
  buttonColor: string;
  isActive: boolean;
}

const Slide: React.FC<IProps> = ({ isActive, imgUrl, title, description, buttonColor }) => {
  const [classes, setClasses] = useState<string>(isActive ? [cl.container, cl.active].join(' ') : cl.container);

  useEffect(() => {
    setClasses(isActive ? [cl.container, cl.active].join(' ') : cl.container);
  });

  return (
    <div className={classes}>
      <img className={cl.img} src={imgUrl} alt="background" />
      <div className={cl.content}>
        <h2 className={cl.title}>{title}</h2>
        <p className={cl.description}>{description}</p>
        <button className={cl.button} type="button" style={{ background: buttonColor }}>
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default memo(Slide);
