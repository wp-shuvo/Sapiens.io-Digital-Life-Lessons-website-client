import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/ErrorPage/Loading';
import AdminAnalytics from './AdminAnalytics';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ['admin-overview'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/lessons');
      return res.data;
    },
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (usersLoading) {
    return <Loading />;
  }

  // console.log('admin overview data>>', data);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Admin Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Total Users</p>
          <h3 className="text-3xl font-bold">{users.length}</h3>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Public Lessons</p>
          <h3 className="text-3xl font-bold">
            {lessons.filter(l => l.privacy === 'Public').length || 0}
          </h3>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Reported Lessons</p>
          <h3 className="text-3xl font-bold text-red-500">
            {lessons.filter(l => l.reportCount > 0).length || 0}
          </h3>
        </div>
      </div>
      <AdminAnalytics />
    </div>
  );
};

export default AdminDashboardHome;
