import React, { ReactNode } from 'react';
import cl from './SliderContent.module.scss';

interface IProps {
  children: ReactNode;
}

const SliderContent: React.FC<IProps> = ({ children }) => <div className={cl.container}>{children}</div>;

export default SliderContent;
