import React, { useMemo, useState } from 'react';
import { updateColor } from '@store/reducers/orderDetailsReduces';
import { useAppDispatch, useAppSelector } from '@store/store';
import OrderRadio from '@components/common/orderRadio/OrderRadio';
import cl from './OptionsColorGroup.module.scss';

const OptionsColorGroup: React.FC = () => {
  const dispath = useAppDispatch();
  const [selectedId, setSelectedId] = useState('anyColor');
  const colorsList = useAppSelector(
    (state) => state.orderDetails.model.value.colors,
  );
  const colors = colorsList.map((color, index) => ({
    colorName: color,
    id: index,
  }));

  useMemo(() => {
    const colorId = selectedId.replace(/[^0-9.]/g, '');

    if (colorId) {
      dispath(updateColor(colors[Number(colorId)].colorName));
    } else {
      const randomId = Math.floor(Math.random() * colors.length);
      dispath(updateColor(colors[randomId].colorName));
    }
  }, [selectedId]);

  return (
    <div className={cl.container}>
      <h4 className={cl.title}>Цвет</h4>
      <div className={cl.colorGroup}>
        <OrderRadio
          title="Любой"
          id="anyColor"
          groupName="color"
          checkedId={selectedId}
          setFilterId={setSelectedId}
        />
        {colors.map((color) => (
          <OrderRadio
            title={color.colorName}
            id={`color${color.id.toString()}`}
            groupName="color"
            key={color.id}
            checkedId={selectedId}
            setFilterId={setSelectedId}
          />
        ))}
      </div>
    </div>
  );
};

export default OptionsColorGroup;
