import React from 'react';
import { Link } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/ErrorPage/Loading';

const DashboardUser = () => {
  const { user } = useAuth();
  const axiousSecure = useAxiosSecure();

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

  console.log(myLessons);

  if (isLoading) {
    return <Loading />;
  }
  if (userDataLoading) {
    return <Loading />;
  }
  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card bg-base-200 p-4">
          <h3 className="text-sm">Total Lessons</h3>
          <p className="text-2xl font-bold">{myLessons?.length || 0}</p>
        </div>
        <div className="card bg-base-200 p-4">
          <h3 className="text-sm">Saved Lessons</h3>
          <p className="text-2xl font-bold">
            {userData?.savedLessons?.length || 0}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Link to="/dashboard/add-lesson" className="btn ">
          ➕ Add Lesson
        </Link>
        <Link to="/dashboard/my-lessons" className="btn">
          📚 My Lessons
        </Link>
        <Link to="/dashboard/save-lessons" className="btn">
          🔖 Saved
        </Link>
      </div>

      {/* Recent Lessons */}
      <div>
        <h2 className="text-xl font-bold mb-3">Recently Added</h2>
        <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* map recent lessons here */}
          {myLessons.slice(0, 4).map((lesson, index) => (
            <div
              key={lesson._id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6"
            >
              {/*  Lesson Image */}
              <img
                src={
                  lesson.image ||
                  'https://i.ibb.co.com/GvyP637K/defult-image.jpg'
                }
                alt={lesson.title}
                className="w-full md:w-48 h-40 object-cover rounded-xl"
              />

              {/* Lesson Info */}
              <div className="flex-1 space-y-3">
                <h2 className="text-xl font-bold text-gray-900">
                  {index + 1}. {lesson.title}
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics */}
      <div className="card bg-base-200 p-4">
        <h2 className="font-bold mb-2">Your Activity</h2>
        {/* Chart will go here */}
        <p className="text-sm text-gray-500">Weekly lessons / reflections</p>
      </div>
    </div>
  );
};

export default DashboardUser;
