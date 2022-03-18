import React from 'react';
import { Outlet } from 'react-router-dom';
import Aside from '../../components/containers/aside/Aside';

const Root: React.FC = () => {
  return (
    <>
      <Aside />
      <Outlet />
    </>
  );
};

export default Root;
