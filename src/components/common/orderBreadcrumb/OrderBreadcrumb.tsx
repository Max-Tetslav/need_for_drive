import React, { Fragment, useCallback } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classnames from 'classnames';
import { Breadcrumb } from 'antd';
import { useAppSelector } from '@store/store';
import breadcrumbRoutes from '@utils/constants/breadcrumbData';
import separatorIcon from '@assets/svg/breadcrumbSeparator.svg';
import cl from './OrderBreadcrumb.module.scss';

const OrderBreadcrumb: React.FC = () => {
  const location = useLocation();
  const { orderId } = useParams();
  const orderDetailsData = useAppSelector((state) => state.orderDetails);

  const setIsReady = useCallback(
    (routeType: string): boolean => {
      let isReady = false;
      switch (routeType) {
        case 'point': {
          isReady = true;
          break;
        }
        case 'model': {
          isReady = Boolean(orderDetailsData.point.orderData.address);
          break;
        }
        case 'options': {
          isReady = Boolean(
            orderDetailsData.model.value.name &&
              orderDetailsData.point.orderData.address,
          );
          break;
        }
        case 'total': {
          isReady = Boolean(
            orderDetailsData.options.finalPrice &&
              orderDetailsData.model.value.name &&
              orderDetailsData.point.orderData.address,
          );
          break;
        }

        // no default
      }
      return isReady;
    },
    [orderDetailsData],
  );

  return (
    <div className={cl.breadcrumbWrapper}>
      {orderId ? (
        <p className={cl.orderId}>
          {`Заказ номер ${orderId.replace(':', '').toLocaleUpperCase()}`}
        </p>
      ) : (
        <Breadcrumb separator="" className={cl.breadcrumb}>
          {breadcrumbRoutes.map((route, index) => {
            const isCurrentPath = location.pathname.includes(route.path);
            const isStepReady = setIsReady(route.type);

            return index === breadcrumbRoutes.length - 1 ? (
              <Link
                to={isStepReady ? route.path : location.pathname}
                key={route.id}
                className={classnames(
                  cl.link,
                  { [cl.activeLink]: isCurrentPath },
                  { [cl.completeLink]: isStepReady },
                )}
              >
                {route.breadcrumbName}
              </Link>
            ) : (
              <Fragment key={route.id}>
                <Link
                  to={isStepReady ? route.path : location.pathname}
                  className={classnames(
                    cl.link,
                    { [cl.activeLink]: isCurrentPath },
                    { [cl.completeLink]: isStepReady },
                  )}
                >
                  {route.breadcrumbName}
                </Link>
                <Breadcrumb.Separator>
                  <img
                    src={separatorIcon}
                    className={cl.separator}
                    alt="breadcrumb-separator"
                  />
                </Breadcrumb.Separator>
              </Fragment>
            );
          })}
        </Breadcrumb>
      )}
    </div>
  );
};

export default OrderBreadcrumb;
