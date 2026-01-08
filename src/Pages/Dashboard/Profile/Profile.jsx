import React from 'react';
import useIsPremium from '../../../Hooks/useisPremium';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/ErrorPage/Loading';

const Profile = () => {
  const { isPremium } = useIsPremium();
  const { user } = useAuth();
  const axiousSecure = useAxiosSecure();

  const { data: myLessons = [], isLoading } = useQuery({
    queryKey: ['myLessons', user?.email],
    queryFn: async () => {
      const res = await axiousSecure.get(`/lessons/author/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleUpdateProfile = () => {
    //navigate to profile update page
    window.location.href = '/dashboard/update-profile';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className=" mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>
        <p className="text-gray-600 mb-12">
          View all your profile details here.
        </p>

        {/* Main*/}
        <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col md:flex-row gap-10">
          {/* Photo & Name */}
          <div className="flex flex-col items-center gap-4 md:w-1/3">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#C8E661]">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {isPremium && (
              <span className="text-[12px] text-yellow-600 font-semibold">
                Premium Member
              </span>
            )}
            {isPremium === false && (
              <span className="text-[12px] text-gray-500 font-semibold">
                Free Member
              </span>
            )}
            <button
              onClick={handleUpdateProfile}
              className="mt-4 bg-[#C8E661] hover:bg-[#A8C641] text-gray-900 font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Upgrade Profile
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div>
              <p className="text-gray-500 font-semibold mb-1.5">Name</p>
              <p className="text-gray-900">{user.displayName}</p>
            </div>
            <div>
              <p className="text-gray-500 font-semibold mb-1.5">Email</p>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-500 font-semibold mb-1.5">
                lessons created
              </p>
              <p className="text-gray-900">{myLessons.length}</p>
            </div>
            <div>
              <p className="text-gray-500 font-semibold mb-1.5">
                lessons saved
              </p>
              <p className="text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
