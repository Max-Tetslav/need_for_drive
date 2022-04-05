import React, { Fragment, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { Breadcrumb } from 'antd';
import breadcrumbRoutes from '@utils/constants/breadcrumbData';
import separatorIcon from '@assets/svg/breadcrumbSeparator.svg';
import { useAppDispatch } from '@store/store';
import { EOrderItemTypes } from '@models/orderPageData';
import { updateCurrentModel } from '@store/reducers/breadcrumbReducer';
import cl from './OrderBreadcrumb.module.scss';

const OrderBreadcrumb: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

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

          return index === breadcrumbRoutes.length - 1 ? (
            <Link
              to="/"
              key={route.id}
              className={classnames(cl.link, cl.lastLink)}
            >
              {route.breadcrumbName}
            </Link>
          ) : (
            <Fragment key={route.id}>
              <Link
                to={route.isComplete ? route.path : location.pathname}
                className={classnames(
                  cl.link,
                  { [cl.activeLink]: isCurrentPath },
                  { [cl.completeLink]: route.isComplete },
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
