import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/ErrorPage/Loading';
import { Link } from 'react-router';

const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: featured = [], isLoading } = useQuery({
    queryKey: ['featured-lessons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/lessons/featured');
      return res.data;
    },
  });

  // console.log(featured);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Featured Life Lessons
        </h2>
        <p className="mt-4 text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover the best life lessons from our experts. Learn from real-life
          experiences and grow with wisdom.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {featured.map(lesson => (
          <div
            key={lesson._id}
            className="relative bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden p-4"
          >
            {/* Image */}
            {lesson.image && (
              <img
                src={lesson.image}
                alt={lesson.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}

            <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>

            <p className="text-gray-700 text-sm line-clamp-4 mb-3">
              {lesson.description}
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
                  {lesson.createdAt
                    ? new Date(lesson.createdAt).toLocaleDateString()
                    : ''}
                </span>
              </div>
            )}
            <Link
              to={`/publicLessons/${lesson._id}`}
              className="inline-block mt-2 text-black px-4 py-2 bg-[#C8E661] font-semibold rounded hover:bg-[#b7d854] transition"
            >
              See Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedLessons;
