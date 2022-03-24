import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/containers/header/Header';
import OrderBreadcrumb from '@components/common/orderBreadcrumb/OrderBreadcrumb';
import cl from './OrderPage.module.scss';

const OrderPage: React.FC = () => {
  return (
    <main className={cl.main}>
      <OrderBreadcrumb />
      <div className={cl.wrapper}>
        <Header headerClass={cl.header} />
        <Outlet />
      </div>
    </main>
  );
};

export default OrderPage;
