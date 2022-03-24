import LangSwitcher from '@components/common/langSwitcher/LangSwitcher';
import React from 'react';
import cl from './Aside.module.scss';

const Aside: React.FC = () => {
  return (
    <aside className={cl.aside}>
      <LangSwitcher className={cl.langSwitcherDesktop} />
    </aside>
  );
};

export default Aside;
