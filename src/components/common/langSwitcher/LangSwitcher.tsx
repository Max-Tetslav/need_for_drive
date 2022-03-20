import React, { useCallback, useEffect, useState } from 'react';
import cl from './LangSwitcher.module.scss';

interface IProps {
  isMenuOpen: boolean;
}

const LangSwitcher: React.FC<IProps> = ({ isMenuOpen }) => {
  const [actualLang, setActualLang] = useState('Eng');
  const [mobileAdaptive, setMobileAdaptive] = useState<React.CSSProperties>();

  useEffect(() => {
    if (window.innerWidth <= 420 && isMenuOpen) {
      setTimeout(() => setMobileAdaptive({ display: 'flex' }), 1000);
    } else {
      setMobileAdaptive(undefined);
    }
  }, [isMenuOpen]);

  const switchLang = useCallback(() => {
    if (actualLang === 'Eng') {
      setActualLang('Рус');
    } else {
      setActualLang('Eng');
    }
  }, [actualLang]);

  return (
    <button className={cl.container} type="button" style={mobileAdaptive} onClick={switchLang}>
      <p className={cl.text}>{actualLang}</p>
    </button>
  );
};

export default LangSwitcher;
