import React, { ReactNode } from 'react';
import cl from './SliderContent.module.scss';

interface ISliderContentProps {
  children: ReactNode;
}

const SliderContent: React.FC<ISliderContentProps> = ({ children }) => (
  <div className={cl.container}>{children}</div>
);

export default SliderContent;
