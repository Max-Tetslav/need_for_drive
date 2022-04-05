import React from 'react';
import CarModelCard from '@components/common/carModelCard/CarModelCard';
import needForDriveApi from '@services/needForDriveAPI';
import loadingIcon from '@assets/svg/loading.svg';
import { ICar } from '@models/orderPageData';
import cl from './OrderCarsList.module.scss';

const OrderCarsList: React.FC = () => {
  const { data, isLoading } = needForDriveApi.useGetCarsListQuery('');

  return (
    <div className={cl.container}>
      {isLoading ? (
        <div className={cl.loading}>
          <img className={cl.loadingImg} src={loadingIcon} alt="loading" />
        </div>
      ) : (
        (data as { data: ICar[] }).data.map((item) => (
          <CarModelCard
            maxPrice={item.priceMax}
            minPrice={item.priceMin}
            id={item.id}
            title={item.name}
            img={item.thumbnail.path}
            key={item.id}
          />
        ))
      )}
    </div>
  );
};

export default OrderCarsList;
