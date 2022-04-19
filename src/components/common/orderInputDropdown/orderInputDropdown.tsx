import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@store/store';
import {
  updateAddress,
  updateCity,
  updatePoint,
} from '@store/reducers/orderDetailsReducer';
import {
  ELocationInputTypes,
  ICity,
  ILocationResponse,
  IPoint,
} from '@models/orderPageData';
import cl from './orderInputDropdown.module.scss';

interface IDropdownPlaceProps {
  inputString: string;
  setString: React.Dispatch<React.SetStateAction<string>>;
  isFocus: boolean;
  type: string;
  data: ILocationResponse;
}

const orderInputDropdown: React.FC<IDropdownPlaceProps> = ({
  inputString,
  type,
  isFocus,
  setString,
  data,
}) => {
  const dispatch = useAppDispatch();
  const point = useAppSelector((state) => state.orderDetails.point);
  const [filteredData, setFilteredData] = useState<ICity[] | IPoint[]>([]);
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  useEffect(() => {
    if (data) {
      if (type === ELocationInputTypes.CITY) {
        setFilteredData(data.data);
      } else {
        const withCityData = (data.data as IPoint[]).filter(
          (item) => item.cityId,
        );

        setFilteredData(
          withCityData.filter((item) => item.cityId.name === point.cityId.name),
        );
      }
    }
  }, [data, point.cityId.name]);

  useEffect(() => {
    setIsDropdownShown(isFocus);
  }, [isFocus]);

  const filterDataInCityDropdown = (): void => {
    setFilteredData(
      (data.data as ICity[]).filter((item: ICity) =>
        item.name
          .toLocaleLowerCase()
          .replace(' ', '')
          .includes(inputString.toLocaleLowerCase().replace(' ', '')),
      ),
    );
  };

  const filterDataInPointDropdown = (): void => {
    setFilteredData(
      (data.data as IPoint[]).filter(
        (item: IPoint) =>
          Boolean(item.cityId) &&
          item.cityId.name.toLocaleLowerCase() ===
            point.cityId.name.toLocaleLowerCase() &&
          item.address
            .toLocaleLowerCase()
            .includes(inputString.toLocaleLowerCase()),
      ),
    );
  };

  const setDataWithoutFilter = (): void => {
    if (filteredData.length === 0) {
      setFilteredData(data.data);
      dispatch(updateCity(''));
    }
  };

  useEffect(() => {
    if (data) {
      switch (type) {
        case ELocationInputTypes.CITY:
          // Фильтрует по строке
          filterDataInCityDropdown();
          break;
        case ELocationInputTypes.POINT:
          // Фильтрует по наличии города в адресе пункта выдачи, с выбранным городом, по строке
          filterDataInPointDropdown();
          break;
        default: {
          // Сбрасывает фильтры, если инпут пустой
          setDataWithoutFilter();
        }
      }
    }
  }, [inputString]);

  const clickHandler = useCallback(
    (
      e: React.MouseEvent<HTMLLIElement, MouseEvent>,
      item: IPoint | ICity,
    ): void => {
      const selectedValue = (e.target as HTMLLIElement).textContent as string;

      setString(selectedValue);

      switch (type) {
        case ELocationInputTypes.CITY:
          dispatch(updateCity(selectedValue));
          break;
        case ELocationInputTypes.POINT:
          dispatch(updatePoint(item as IPoint));
          dispatch(updateAddress(selectedValue));
          break;

        // no default
      }

      setIsDropdownShown(false);
    },
    [],
  );

  useEffect(() => {
    // скрывает если выбран какой-то вариант
    if (inputString.length && !point.cityId.name) {
      setIsDropdownShown(true);
    }
  }, [inputString]);

  let notFoundMessage;

  if (type === ELocationInputTypes.POINT && !point.cityId.name) {
    // если город не выбран
    notFoundMessage = (
      <li className={cl.dropdownItemNotFound}>Сначала выберите город</li>
    );
  } else if (inputString.length !== 0 && filteredData.length === 0) {
    // если нет совпадений по строке
    notFoundMessage = (
      <li className={cl.dropdownItemNotFound}>Совпадений не найдено</li>
    );
  } else if (
    type === ELocationInputTypes.POINT &&
    point.address &&
    filteredData.length === 1
  ) {
    notFoundMessage = (
      <li className={cl.dropdownItemNotFound}>
        В этом городе нет других пунктов выдачи
      </li>
    );
  } else if (filteredData.length === 0) {
    // если в городе нет пунктов выдачи
    notFoundMessage = (
      <li className={cl.dropdownItemNotFound}>
        В этом городе нет пункта выдачи
      </li>
    );
  }

  const dropdownClassName = classNames(cl.dropdown, {
    [cl.showDropdown]: isDropdownShown,
  });

  return (
    <ul className={dropdownClassName}>
      {notFoundMessage ||
        (filteredData as Array<ICity | IPoint>).map((item) => (
          <li
            key={item.id}
            className={cl.dropdownItem}
            onClick={(e) => clickHandler(e, item)}
            onKeyUp={() => false}
            role="option"
            aria-selected="false"
          >
            {type === ELocationInputTypes.CITY
              ? item.name
              : (item as IPoint).address}
          </li>
        ))}
    </ul>
  );
};

export default orderInputDropdown;
