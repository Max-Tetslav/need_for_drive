import React from 'react';
import { Link } from 'react-router-dom';
import cl from './LandingContent.module.scss';

const LandingContent: React.FC = () => {
  return (
    <div className={cl.container}>
      <div className={cl.textContainer}>
        <h2 className={[cl.title, cl.blackTitle].join(' ')}>Каршеринг</h2>
        <h2 className={[cl.title, cl.greenTitle].join(' ')}>Need for drive</h2>
        <p className={cl.description}>Поминутная аренда авто твоего города</p>
      </div>
      <Link className={cl.button} to="/order">
        Забронировать
      </Link>
    </div>
  );
};

export default LandingContent;
