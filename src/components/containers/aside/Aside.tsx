import React from 'react';
import LangSwitcher from '@components/common/langSwitcher/LangSwitcher';
import cl from './Aside.module.scss';

const Aside: React.FC = () => {
  return (
    <aside className={cl.aside}>
      <LangSwitcher />
    </aside>
  );
};

export default Aside;
