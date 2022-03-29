import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import cl from './orderInputDropdown.module.scss';

interface IDropdownPlaceProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}

const orderInputDropdown: React.FC<IDropdownPlaceProps> = ({ value, setValue, type }) => {
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const [choice, setChoice] = useState('');
  // const [data, setData] = useState<any[]>();

  const clickHandler = useCallback((e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    setValue((e.target as HTMLLIElement).textContent as string);
    setChoice((e.target as HTMLLIElement).textContent as string);
    setIsDropdownShown(false);
  }, []);

  useEffect(() => {
    if (choice) {
      setIsDropdownShown(false);
      return;
    }

    if (value.length && !isDropdownShown) {
      setIsDropdownShown(true);
    }

    if (value.length === 0) {
      setIsDropdownShown(false);
    }
  }, [value]);

  return (
    <ul className={classNames(cl.dropdown, { [cl.showDropdown]: isDropdownShown })}>
      {/* {data!.map((item) => { */}
      <li
        className={cl.dropdownItem}
        onClick={clickHandler}
        onKeyUp={(e: React.KeyboardEvent) => false}
        role="option"
        aria-selected="false"
      >
        ВЫАЫВАФЫВАФ
      </li>
      <li
        className={cl.dropdownItem}
        onClick={clickHandler}
        onKeyUp={(e: React.KeyboardEvent) => false}
        role="option"
        aria-selected="false"
      >
        ФЫВАЫВАФАВЫФА
      </li>
      <li
        className={cl.dropdownItem}
        onClick={clickHandler}
        onKeyUp={(e: React.KeyboardEvent) => false}
        role="option"
        aria-selected="false"
      >
        ффвыафываывф
      </li>
      <li
        className={cl.dropdownItem}
        onClick={clickHandler}
        onKeyUp={(e: React.KeyboardEvent) => false}
        role="option"
        aria-selected="false"
      >
        фвыаывфаыва
      </li>
      <li
        className={cl.dropdownItem}
        onClick={clickHandler}
        onKeyUp={(e: React.KeyboardEvent) => false}
        role="option"
        aria-selected="false"
      >
        фвыаывфаыва
      </li>
      <li
        className={cl.dropdownItem}
        onClick={clickHandler}
        onKeyUp={(e: React.KeyboardEvent) => false}
        role="option"
        aria-selected="false"
      >
        фвыаывфаыва
      </li>

      {/* })} */}
    </ul>
  );
};

export default orderInputDropdown;
