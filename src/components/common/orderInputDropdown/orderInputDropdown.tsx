import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ELocationInputTypes, ICity, ILocationResponse, IPoint } from '@models/orderPageData';
import { useAppDispatch, useAppSelector } from '@store/store';
import { updateCurrentCity, updateCurrentPoint } from '@store/reducers/locationReducer';
import cl from './orderInputDropdown.module.scss';

interface IDropdownPlaceProps {
  inputString: string;
  setString: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isFocus: boolean;
  type: string;
  data: ILocationResponse;
}

const orderInputDropdown: React.FC<IDropdownPlaceProps> = ({ inputString, type, isFocus, setString, setValue, data }) => {
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const [choice, setChoice] = type === ELocationInputTypes.CITY ? useState(true) : useState(false);
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.location.city);

  const [filteredData, setFilteredData] = useState<ICity[] | IPoint[]>(data ? data.data : []);

  useEffect(() => {
    setIsDropdownShown(isFocus);
  }, [isFocus]);

  useEffect(() => {
    if (data) {
      switch (type) {
        case ELocationInputTypes.CITY:
          // Фильтрует по строке
          setFilteredData(
            (data.data as ICity[]).filter((item: ICity) =>
              item.name.toLocaleLowerCase().includes(inputString.toLocaleLowerCase()),
            ),
          );
          break;
        case ELocationInputTypes.POINT:
          // Фильтрует по наличии города в адресе пункта выдачи, с выбранным городом, по строке
          setFilteredData(
            (data.data as IPoint[]).filter(
              (item: IPoint) =>
                Boolean(item.cityId) &&
                item.cityId.name.toLocaleLowerCase() === currentCity.toLocaleLowerCase() &&
                item.name.toLocaleLowerCase().includes(inputString.toLocaleLowerCase()),
            ),
          );
          break;
        default: {
          if (filteredData.length === 0) {
            setFilteredData(data.data);
            dispatch(updateCurrentCity(''));
          }
        }
      }
    }
  }, [inputString, data, currentCity]);

  const clickHandler = useCallback((e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    const selectedValue = (e.target as HTMLLIElement).textContent as string;
    setChoice(true);

    setValue(selectedValue);
    setString(selectedValue);

    switch (type) {
      case ELocationInputTypes.CITY:
        dispatch(updateCurrentCity(selectedValue));
        break;
      case ELocationInputTypes.POINT:
        dispatch(updateCurrentPoint(selectedValue));
        break;

      // no default
    }

    setIsDropdownShown(false);
  }, []);

  useEffect(() => {
    // скрывает если выбран какой-то вариант
    if (inputString.length && !choice) {
      setIsDropdownShown(true);
    }

    if (inputString.length === 0) {
      // setIsDropdownShown(false);
      setChoice(false);
    }
  }, [inputString]);

  let notFoundMessage;

  if (type === ELocationInputTypes.POINT && !currentCity) {
    // если город не выбран
    notFoundMessage = <li className={cl.dropdownItem}>Сначала выберите город</li>;
  } else if (inputString.length !== 0 && !choice) {
    // если нет совпадений по строке
    notFoundMessage = <li className={cl.dropdownItem}>Совпадений не найдено</li>;
  } else if (filteredData.length === 0) {
    // если в городе нет пунктов выдачи
    notFoundMessage = <li className={cl.dropdownItem}>В этом городе нет пункта выдачи</li>;
  }

  return (
    <ul className={classNames(cl.dropdown, { [cl.showDropdown]: isDropdownShown })}>
      {notFoundMessage ||
        (filteredData as Array<ICity | IPoint>).map((item) => (
          <li
            key={item.id}
            className={cl.dropdownItem}
            onClick={clickHandler}
            onKeyUp={() => false}
            role="option"
            aria-selected="false"
          >
            {type === ELocationInputTypes.CITY ? item.name : (item as IPoint).address}
          </li>
        ))}
    </ul>
  );
};

export default orderInputDropdown;
