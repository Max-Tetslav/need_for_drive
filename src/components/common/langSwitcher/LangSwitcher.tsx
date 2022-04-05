import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import cl from './LangSwitcher.module.scss';

interface ILangSwitcherProps {
  className: string;
}

const LangSwitcher: React.FC<ILangSwitcherProps> = ({ className }) => {
  const [actualLang, setActualLang] = useState('Eng');

  const switchLang = useCallback(() => {
    if (actualLang === 'Eng') {
      setActualLang('Рус');
    } else {
      setActualLang('Eng');
    }
  }, [actualLang]);

  return (
    <button
      className={classnames(className, cl.container)}
      type="button"
      onClick={switchLang}
    >
      <p className={cl.text}>{actualLang}</p>
    </button>
  );
};

export default LangSwitcher;
