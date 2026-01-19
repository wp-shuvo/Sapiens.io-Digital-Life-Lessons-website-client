import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/ErrorPage/Loading';

const TopContributors = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ['most-active-contributors'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/overview');
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const { mostActiveContributors = [] } = data;

  // console.log(mostActiveContributors);

  return (
    <div className="w-full">
      <h2 className="text-3xl text-center md:text-4xl font-bold text-gray-900 mb-4">
        Top Contributors of the Week
      </h2>

      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        Discover the top contributors of the week and learn from their life
        lessons.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {mostActiveContributors.slice(0, 3).map(user => (
          <div
            key={user._id}
            className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-5 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-xl overflow-hidden mb-4">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{user.displayName}</h3>
              <span className="text-green-500">✔</span>
            </div>

            <p className="text-sm text-gray-500 mt-1">{user.email}</p>

            <p className="mt-3 text-sm font-medium text-gray-700">
              Lessons:{' '}
              <span className="text-black font-semibold">
                {user.lessonCount}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributors;
