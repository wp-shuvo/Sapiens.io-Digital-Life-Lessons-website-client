import React from 'react';
import useIsPremium from '../../../Hooks/useIsPremium';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/ErrorPage/Loading';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router';
import useRole from '../../../Hooks/useRole';

const Profile = () => {
  const { isPremium } = useIsPremium();
  const { user } = useAuth();
  const axiousSecure = useAxiosSecure();
  const { role } = useRole();

  // get my lessons
  const { data: myLessons = [], isLoading } = useQuery({
    queryKey: ['myLessons', user?.email],
    queryFn: async () => {
      const res = await axiousSecure.get(`/lessons/author/${user?.email}`);
      return res.data;
    },
  });

  // get user
  const { data: userData = {}, isLoading: userDataLoading } = useQuery({
    queryKey: ['userData', user?.email],
    queryFn: async () => {
      const res = await axiousSecure.get(`/users/email/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (userDataLoading) {
    return <Loading />;
  }

  const handleUpdateProfile = () => {
    window.location.href = '/dashboard/update-profile';
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-16 px-6">
        <div className=" mx-auto">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>
          <p className="text-gray-600 mb-12">
            {userData?.displayName} View your profile details here.
          </p>

          {/* Main*/}
          <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col md:flex-row gap-10">
            {/* Photo & Name */}
            <div className="flex flex-col items-center gap-4 md:w-1/3">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#C8E661]">
                <img
                  src={userData?.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isPremium && role === 'user' && (
                <span className="text-[12px] text-yellow-600 font-semibold">
                  Premium Member
                </span>
              )}
              {isPremium === false && role === 'user' && (
                <span className="text-[12px] text-gray-500 font-semibold">
                  Free Member
                </span>
              )}
              {role === 'admin' && (
                <span className="text-[14px] text-yellow-600 font-bold">
                  Admin 👑
                </span>
              )}
              <button
                onClick={handleUpdateProfile}
                className="mt-4 bg-[#C8E661] hover:bg-[#A8C641] text-gray-900 font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Update Profile
              </button>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div>
                <p className="text-gray-500 font-semibold mb-1.5">Name</p>
                <p className="text-gray-900">{userData?.displayName}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold mb-1.5">Email</p>
                <p className="text-gray-900">{userData?.email}</p>
              </div>
              {role === 'user' && (
                <>
                  <div>
                    <p className="text-gray-500 font-semibold mb-1.5">
                      lessons created
                    </p>
                    <p className="text-gray-900">{myLessons?.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold mb-1.5">
                      lessons saved
                    </p>
                    <p className="text-gray-900">
                      {userData?.savedLessons?.length || 0}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          {role === 'user' && (
            <>
              <div>
                <div className="min-h-screen bg-gray-50 py-16 px-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    My Lessons
                  </h1>
                  <p className="text-gray-600 mb-12">
                    View your recent lessons here.
                  </p>

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                    {myLessons.slice(0, 6).map(lesson => (
                      <div
                        key={lesson._id}
                        className="bg-white rounded-2xl shadow-md p-6 flex flex-col  gap-6"
                      >
                        {/* Left: Lesson Image */}
                        <img
                          src={
                            lesson.image ||
                            'https://i.ibb.co.com/GvyP637K/defult-image.jpg'
                          }
                          alt={lesson.title}
                          className="w-full  h-40 object-cover rounded-xl"
                        />

                        {/* Middle: Lesson Info */}
                        <div className="flex-1 space-y-3">
                          <h2 className="text-xl font-bold text-gray-900">
                            {lesson.title}
                          </h2>

                          <p className="text-gray-600 text-sm line-clamp-3">
                            {lesson.description}
                          </p>

                          <div className="flex flex-wrap gap-3 text-sm">
                            <span className="bg-gray-100 px-3 py-1 rounded-full">
                              📂 {lesson.category}
                            </span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full">
                              🎭 {lesson.emotionalTone}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full font-semibold ${
                                lesson.accessLevel === 'Free'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {lesson.accessLevel}
                            </span>
                          </div>

                          {/* Creator Info */}
                          <div className="flex items-center gap-3 pt-2">
                            <img
                              src={lesson.authorPhoto}
                              alt={lesson.authorName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-sm font-semibold">
                                {lesson.authorName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(
                                  lesson.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Right: Action */}
                        <div className="flex justify-between items-center ">
                          <div>
                            <span className="text-sm font-medium text-gray-500">
                              {lesson.privacy}
                            </span>
                          </div>

                          <div className="flex gap-1.5">
                            <Link
                              to={`/publicLessons/${lesson._id}`}
                              className="mt-4 md:mt-auto bg-[#C8E661]  text-gray-900 px-5 py-2 rounded-lg font-semibold hover:bg-[#b7d854] transition flex items-center justify-center gap-1"
                            >
                              {' '}
                              <FaEye />
                              <span className=" hidden md:block">
                                See Details
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
