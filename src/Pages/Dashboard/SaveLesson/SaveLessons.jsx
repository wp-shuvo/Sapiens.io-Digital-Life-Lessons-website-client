import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/ErrorPage/Loading';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const SaveLessons = () => {
  const { user } = useAuth();
  const axiousSecure = useAxiosSecure();

  const {
    data: savedLessons = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['saved-lessons', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiousSecure.get(`/lessons/save/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load saved lessons.
      </p>
    );
  }

  const handleRemoveLesson = async lessonId => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        await axiousSecure.delete('/lessons/save', {
          data: { lessonId, userEmail: user.email },
        });
        Swal.fire('Deleted!', 'The lesson has been removed.', 'success');
        refetch();
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto md:px-6 md:py-12">
      <h1 className="text-2xl font-bold mb-8">Favourite / Saved Lessons</h1>

      {savedLessons.length === 0 && (
        <p className="text-gray-500 font-medium">
          You don't have any saved or favourite lessons yet ❌.
        </p>
      )}

      <div className="space-y-6">
        {savedLessons.map(lesson => (
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
              <div className="flex items-center justify-between">
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
                <button
                  onClick={() => handleRemoveLesson(lesson._id)}
                  className="mt-4 md:mt-auto bg-[#C8E661] text-gray-900 px-5 py-2 rounded-lg font-semibold hover:bg-red-400 transition"
                >
                  Remove →
                </button>
              </div>
            </div>

            {/* Right: Action */}
            <div className="flex md:flex-col justify-between items-start md:items-end">
              <span className="text-sm font-medium text-gray-500">
                {lesson.privacy}
              </span>

              <Link
                to={`/publicLessons/${lesson._id}`}
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

export default SaveLessons;
