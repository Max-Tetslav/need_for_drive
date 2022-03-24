import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Breadcrumb } from 'antd';
import breadcrumbRoutes from '@utils/constants/breadcrumbData';
import separatorIcon from '@assets/svg/breadcrumbSeparator.svg';
import cl from './OrderBreadcrumb.module.scss';

const OrderBreadcrumb: React.FC = () => {
  return (
    <div className={cl.breadcrumbWrapper}>
      <Breadcrumb separator="" className={cl.breadcrumb}>
        {breadcrumbRoutes.map((route, index) => {
          return index === breadcrumbRoutes.length - 1 ? (
            <Link to="/" key={route.id} className={classnames(cl.link, cl.lastLink)}>
              {route.breadcrumbName}
            </Link>
          ) : (
            <Fragment key={route.id}>
              <Link
                to={route.isComplete ? route.path : ''}
                className={classnames(cl.link, { [cl.activeLink]: route.isComplete })}
              >
                {route.breadcrumbName}
              </Link>
              <Breadcrumb.Separator>
                <img src={separatorIcon} className={cl.separator} alt="breadcrumb-separator" />
              </Breadcrumb.Separator>
            </Fragment>
          );
        })}
      </Breadcrumb>
    </div>
  );
};

export default OrderBreadcrumb;
