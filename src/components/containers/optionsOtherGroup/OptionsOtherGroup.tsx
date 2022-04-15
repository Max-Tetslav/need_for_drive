import React from 'react';
import otherOptions from '@utils/constants/orderDetailsData';
import OrderCheckbox from '@components/common/orderCheckbox/OrderCheckbox';
import cl from './OptionsOtherGroup.module.scss';

const OptionsOtherGroup: React.FC = () => {
  return (
    <div className={cl.container}>
      <h4 className={cl.title}>Доп услуги</h4>
      <div className={cl.otherGroup}>
        {otherOptions.map((item) => (
          <OrderCheckbox
            title={item.name}
            type={item.type}
            id={`${item.type}${item.id}`}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default OptionsOtherGroup;
