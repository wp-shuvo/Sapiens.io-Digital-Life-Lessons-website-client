import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/ErrorPage/Loading';
import { Link } from 'react-router';

const MyLessons = () => {
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

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">My Lessons</h1>

      {myLessons.length === 0 && (
        <p className="text-gray-500 font-medium">
          You have not created any lessons yet ❌.
        </p>
      )}

      <div className="space-y-6">
        {myLessons.map(lesson => (
          <div
            key={lesson._id}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6"
          >
            {/* Left: Lesson Image */}
            <img
              src={
                lesson.image || 'https://i.ibb.co.com/GvyP637K/defult-image.jpg'
              }
              alt={lesson.title}
              className="w-full md:w-48 h-40 object-cover rounded-xl"
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
                  <p className="text-sm font-semibold">{lesson.authorName}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Action */}
            <div className="flex md:flex-col justify-between items-start md:items-end">
              <span className="text-sm font-medium text-gray-500">
                {lesson.privacy}
              </span>

              <Link
                to={`/lessons/${lesson._id}`}
                className="mt-4 md:mt-auto bg-[#C8E661] text-gray-900 px-5 py-2 rounded-lg font-semibold hover:bg-[#b7d854] transition"
              >
                See Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLessons;
