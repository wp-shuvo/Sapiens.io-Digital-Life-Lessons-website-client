import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router';
import Loading from '../../Components/ErrorPage/Loading';
import useAuth from '../../Hooks/useAuth';
import useIsPremium from '../../Hooks/useIsPremium';

const PublicLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPremium } = useIsPremium();

  const {
    data: lessons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['lessons', user?.email],
    queryFn: async () => {
      const userIdParam = user ? `?userId=${user.email}` : '';
      const res = await axiosSecure.get(`/lessons${userIdParam}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load lessons.</p>
    );

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center mt-5 text-gray-900 mb-6">
        Discover Public Lessons
      </h1>
      <p className="text-center text-gray-600 mb-12 px-4">
        Explore a wide range of public lessons to enhance your learning
        experience.
      </p>
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map(lesson => {
          const locked =
            lesson.locked || (!isPremium && lesson.accessLevel === 'Premium');

          return (
            <div
              key={lesson._id}
              className="relative bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              {/* Locked */}
              {locked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm text-center p-4">
                  <FaLock className="text-4xl text-gray-700 mb-2" />
                  <p className="text-gray-800 font-semibold text-lg">
                    Premium Lesson
                    <br />
                    Upgrade to view
                  </p>
                  <Link to="/pricing">
                    <button className="mt-4 inline-block text-black px-4 py-2 bg-[#C8E661] font-semibold rounded hover:bg-[#b7d854] transition">
                      Upgrade Now
                    </button>
                  </Link>
                </div>
              )}

              <div className={`${locked ? 'filter blur-sm' : ''} p-4`}>
                {/*image */}
                {lesson.image && (
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}

                <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>

                <p className="text-gray-700 text-sm line-clamp-4 mb-3">
                  {lesson.description ||
                    (locked ? 'This lesson is locked for Free users.' : '')}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {lesson.category && (
                    <span className="bg-yellow-100 font-bold text-yellow-800 text-xs px-2 py-1 rounded">
                      {lesson.category}
                    </span>
                  )}
                  {lesson.emotionalTone && (
                    <span className="bg-blue-100 font-bold text-blue-800 text-xs px-2 py-1 rounded">
                      {lesson.emotionalTone}
                    </span>
                  )}
                  {lesson.accessLevel === 'Premium' && (
                    <span className="bg-gray-200 font-bold text-gray-800 text-xs px-2 py-1 rounded">
                      Premium
                    </span>
                  )}
                  {lesson.accessLevel === 'Free' && (
                    <span className="bg-green-100 font-bold text-green-800 text-xs px-2 py-1 rounded">
                      Free
                    </span>
                  )}
                </div>

                {/* Author */}
                {lesson.authorName && (
                  <div className="flex items-center mb-3">
                    {lesson.authorPhoto && (
                      <img
                        src={lesson.authorPhoto}
                        alt={lesson.authorName}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <span className="text-gray-600 text-sm">
                      {lesson.authorName} |{' '}
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {/*  button */}
                {!locked && (
                  <Link
                    to={`/publicLessons/${lesson._id}`}
                    className="inline-block mt-2 text-black px-4 py-2 bg-[#C8E661] font-semibold rounded hover:bg-[#b7d854] transition"
                  >
                    See Details →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublicLessons;
