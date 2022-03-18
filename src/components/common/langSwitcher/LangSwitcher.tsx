import React, { useState } from 'react';
import cl from './LangSwitcher.module.scss';

const LangSwitcher: React.FC = () => {
  const [actualLang] = useState('Eng');

  return (
    <button className={cl.container} type="button">
      <p className={cl.text}>{actualLang}</p>
    </button>
  );
};

export default LangSwitcher;
