import React, { useEffect, useState } from 'react';
import CarModelCard from '@components/common/carModelCard/CarModelCard';
import needForDriveApi from '@services/needForDriveAPI';
import loadingIcon from '@assets/svg/loading.svg';
import { ICar, ICarCategory } from '@models/orderPageData';
import OrderModelRadioGroup from '../orderModelRadioGroup/OrderModelRadioGroup';
import cl from './OrderModelContent.module.scss';

const OrderModelContent: React.FC = () => {
  const { data, isLoading } = needForDriveApi.useGetCarsListQuery('');
  const { data: categories } = needForDriveApi.useGetCarsCategoriesQuery('');

  const [filterId, setFilterId] = useState('');
  const [filteredData, setFilteredData] = useState<Array<ICar>>([]);

  useEffect(() => {
    if (!isLoading) {
      setFilteredData((data as { data: ICar[] }).data);
    }
  }, [isLoading]);

  useEffect(() => {
    if (data) {
      if (filterId === '') {
        setFilteredData(data.data);
      } else {
        setFilteredData(
          data.data.filter((car) => car.categoryId.id === filterId),
        );
      }
    }
  }, [filterId]);

  return isLoading ? (
    <div className={cl.loading}>
      <img className={cl.loadingImg} src={loadingIcon} alt="loading" />
    </div>
  ) : (
    <>
      <OrderModelRadioGroup
        filterBy={filterId}
        setFilterBy={setFilterId}
        data={(categories as { data: ICarCategory[] }).data}
      />
      <div className={cl.container}>
        {!isLoading
          ? filteredData.map((item) => (
              <CarModelCard
                maxPrice={item.priceMax}
                minPrice={item.priceMin}
                id={item.id}
                title={item.name}
                img={item.thumbnail.path}
                key={item.id}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default OrderModelContent;
