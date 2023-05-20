import React, { memo } from 'react';

import axios from 'services/api';

import ProtectedRoutes from 'components/router/ProtectedRoutes';
import Header from 'components/layout/Header';
import LeftSidebar from 'components/layout/LeftSidebar';
import RightSideBar from 'components/layout/RightSideBar';

import useAuth from 'hooks/useAuth';
import useAxiosInterceptor from 'hooks/useAxiosInterceptor';

import routes from './routes';

import './styles.scss';

const App = () => {
  useAxiosInterceptor(axios);
  const { isAuthenticated } = useAuth();

  return (
    <>
      <LeftSidebar />
      <main className="mock-main">
        <Header />
        <ProtectedRoutes routes={routes} isAuthenticated={isAuthenticated} />
      </main>
      <RightSideBar />
    </>
  );
};

export default memo(App);
