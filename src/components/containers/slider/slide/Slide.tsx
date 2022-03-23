import React, { memo } from 'react';
import classnames from 'classnames';
import cl from './Slide.module.scss';

interface ISlideProps {
  imgUrl: string;
  title: string;
  description: string;
  buttonColor: string;
  isActive: boolean;
}

const Slide: React.FC<ISlideProps> = ({ isActive, imgUrl, title, description, buttonColor }) => {
  const classes = classnames(cl.container, { [cl.active]: isActive });

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
