import React from 'react';
import OptionsColorGroup from '../optionsColorGroup/OptionsColorGroup';
import OptionsDateGroup from '../optionsDateGroup/OptionsDateGroup';
import OptionsOtherGroup from '../optionsOtherGroup/OptionsOtherGroup';
import OptionsRateGroup from '../optionsRateGroup/OptionsRateGroup';
import cl from './OptionsContent.module.scss';

const OptionsContent: React.FC = () => {
  return (
    <div className={cl.container}>
      <OptionsColorGroup />
      <OptionsDateGroup />
      <OptionsRateGroup />
      <OptionsOtherGroup />
    </div>
  );
};

export default OptionsContent;
