import React from 'react';

const MostSavedLessons = () => {
  // const axiosSecure = useAxiosSecure();

  // const { data: lessons = [], isLoading } = useQuery({
  //   queryKey: ['most-saved-lessons'],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get('/lessons/most-saved');
  //     return res.data;
  //   },
  // });

  // console.log(lessons);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className="w-full">
      <h2 className="text-3xl text-center md:text-4xl font-bold text-gray-900 mb-4">
        Most Saved Lessons
      </h2>
      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        Explore the most saved life lessons by our community members.
      </p>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {lessons.map(lesson => (
          <div
            key={lesson._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="h-40 w-full">
              <img
                src={lesson.coverImage}
                alt={lesson.lessonTitle}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-2">
                {lesson.lessonTitle}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                By {lesson.authorName}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-600">Saved</span>
                <span className="text-base font-bold">{lesson.saveCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default MostSavedLessons;
