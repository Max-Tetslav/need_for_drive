import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/containers/header/Header';
import OrderBreadcrumb from '@components/common/orderBreadcrumb/OrderBreadcrumb';
import OrderDetails from '@components/containers/orderDetails/OrderDetails';
import cl from './OrderPage.module.scss';

const OrderPage: React.FC = () => {
  return (
    <main className={cl.main}>
      <OrderBreadcrumb />
      <div className={cl.wrapper}>
        <Header headerClass={cl.header} />
        <div className={cl.contentContainerWrapper}>
          <section className={cl.contentContainer}>
            <Outlet />
          </section>
          <OrderDetails />
        </div>
      </div>
    </main>
  );
};

export default OrderPage;
