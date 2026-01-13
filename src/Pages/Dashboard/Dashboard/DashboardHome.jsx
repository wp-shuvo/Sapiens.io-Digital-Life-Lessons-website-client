import React from 'react';
import useRole from '../../../Hooks/useRole';
import Loading from '../../../Components/ErrorPage/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import DashboardUser from './DashboardUser';

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  return role === 'admin' ? <AdminDashboardHome /> : <DashboardUser />;
};

export default DashboardHome;
