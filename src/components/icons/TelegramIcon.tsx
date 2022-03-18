import React, { useCallback, useState } from 'react';

const TelegramIcon: React.FC = () => {
  const [color, setColor] = useState('#fff');

  const hoverHandler = useCallback(() => {
    if (color === '#fff') {
      setColor('#0ec261');
    } else {
      setColor('#fff');
    }
  }, [color]);

  return (
    <svg fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" onMouseOver={hoverHandler} onMouseOut={hoverHandler}>
      <path
        d="M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0s16 7.163 16 16zm-21.286-1.466c-1.602.7-3.25 1.42-4.755 2.249-.787.575.259.983 1.239 1.365.156.06.31.12.455.18l.368.116c1.09.348 2.306.735 3.365.152 1.739-.999 3.38-2.154 5.02-3.308.537-.378 1.074-.756 1.615-1.128l.085-.055c.46-.299 1.496-.97 1.113-.045-.906.99-1.876 1.867-2.851 2.749a61.682 61.682 0 00-1.961 1.825c-.561.455-1.144 1.372-.516 2.01 1.447 1.013 2.916 2 4.385 2.989l1.432.964c.808.645 2.071.124 2.249-.885l.237-1.391a392.41 392.41 0 001.265-7.699c.052-.403.112-.806.172-1.21.145-.978.29-1.957.335-2.94-.117-.982-1.307-.766-1.969-.545-3.404 1.295-6.773 2.686-10.13 4.101-.38.169-.765.337-1.153.506z"
        style={{ transition: 'all 0.3s ease' }}
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};

export default TelegramIcon;
