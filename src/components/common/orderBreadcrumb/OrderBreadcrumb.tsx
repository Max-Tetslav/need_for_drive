import React, { Fragment, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { Breadcrumb } from 'antd';
import { useAppDispatch, useAppSelector } from '@store/store';
import { updateCurrentModel } from '@store/reducers/breadcrumbReducer';
import { EOrderItemTypes } from '@models/orderPageData';
import breadcrumbRoutes from '@utils/constants/breadcrumbData';
import separatorIcon from '@assets/svg/breadcrumbSeparator.svg';
import cl from './OrderBreadcrumb.module.scss';

const OrderBreadcrumb: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const orderDetailsData = useAppSelector((state) => state.orderDetails);

  const setIsReady = useCallback(
    (routeType: string): boolean => {
      let isReady = false;
      switch (routeType) {
        case 'point': {
          isReady = Boolean(orderDetailsData.point.value.address);
          break;
        }
        case 'model': {
          isReady = Boolean(orderDetailsData.model.value.name);
          break;
        }
        case 'options': {
          isReady = Boolean(orderDetailsData.options.finalPrice);
          break;
        }

        // no default
      }
      return isReady;
    },
    [orderDetailsData],
  );

  useEffect(() => {
    if (location.pathname.includes(EOrderItemTypes.MODEL)) {
      dispatch(updateCurrentModel(true));
    }
  }, [location]);

  return (
    <div className={cl.breadcrumbWrapper}>
      <Breadcrumb separator="" className={cl.breadcrumb}>
        {breadcrumbRoutes.map((route, index) => {
          const isCurrentPath = location.pathname.includes(route.path);
          const isStepComplete = setIsReady(route.type);

          return index === breadcrumbRoutes.length - 1 ? (
            <Link
              to={isStepComplete ? route.path : location.pathname}
              key={route.id}
              className={classnames(
                cl.link,
                { [cl.activeLink]: isCurrentPath },
                { [cl.completeLink]: isStepComplete },
              )}
            >
              {route.breadcrumbName}
            </Link>
          ) : (
            <Fragment key={route.id}>
              <Link
                to={isStepComplete ? route.path : location.pathname}
                className={classnames(
                  cl.link,
                  { [cl.activeLink]: isCurrentPath },
                  { [cl.completeLink]: isStepComplete },
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
    </div>
  );
};

export default OrderBreadcrumb;
