import React, { useEffect, useState } from 'react';
import { updateColor } from '@store/reducers/orderDetailsReducer';
import { useAppDispatch, useAppSelector } from '@store/store';
import OrderRadio from '@components/common/orderRadio/OrderRadio';
import cl from './OptionsColorGroup.module.scss';

const OptionsColorGroup: React.FC = () => {
  const dispath = useAppDispatch();
  const currentColorId = useAppSelector(
    (state) => state.orderDetails.options.colorId,
  );
  const colorsList = useAppSelector((state) => state.orderDetails.model.colors);
  const colors = colorsList.map((color, index) => ({
    colorName: color,
    id: index.toString(),
  }));

  const [selectedId, setSelectedId] = useState(currentColorId || 'anyColor');

  useEffect(() => {
    if (selectedId === 'anyColor') {
      const randomId = Math.floor(Math.random() * colors.length);
      dispath(updateColor(colors[randomId].colorName));
    } else {
      setSelectedId(currentColorId);
    }
  }, []);

  useEffect(() => {
    if (selectedId !== 'anyColor') {
      const colorId = selectedId.replace(/[^0-9.]/g, '');

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
            id={`color${color.id}`}
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
