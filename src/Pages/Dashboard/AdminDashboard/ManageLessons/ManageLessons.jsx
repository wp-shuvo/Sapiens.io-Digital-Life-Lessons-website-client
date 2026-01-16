import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../../Components/ErrorPage/Loading';

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState('all');

  const {
    data: lessons = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['admin-lessons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/lessons');
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const totalPublic = lessons.filter(l => l.privacy === 'Public').length;
  const totalPrivate = lessons.filter(l => l.privacy === 'Private').length;
  const totalFlagged = lessons.filter(l => l.reportCount > 0).length;

  const handleDelete = lesson => {
    Swal.fire({
      title: 'Delete this lesson?',
      text: lesson.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then(async r => {
      if (r.isConfirmed) {
        await axiosSecure.delete(`/lessons/${lesson._id}`);
        refetch();
        Swal.fire('Deleted!', '', 'success');
      }
    });
  };

  const handleUpdate = (lesson, update) => {
    axiosSecure.patch(`/lessons/${lesson._id}`, update).then(() => {
      refetch();
      Swal.fire('Updated!', '', 'success');
    });
  };

  // Filter
  const filteredLessons =
    filter === 'all'
      ? lessons
      : filter === 'public'
      ? lessons.filter(l => l.privacy === 'Public')
      : filter === 'private'
      ? lessons.filter(l => l.privacy === 'Private')
      : lessons.filter(l => l.reportCount > 0);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4">Manage Lessons</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-200 rounded-lg">
          <p className="text-sm text-gray-500">Public Lessons</p>
          <p className="font-bold text-lg">{totalPublic}</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <p className="text-sm text-gray-500">Private Lessons</p>
          <p className="font-bold text-lg">{totalPrivate}</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <p className="text-sm text-gray-500">Reported Lessons</p>
          <p className="font-bold text-lg">{totalFlagged}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-2">
        <button className="btn btn-sm" onClick={() => setFilter('all')}>
          All
        </button>
        <button className="btn btn-sm" onClick={() => setFilter('public')}>
          Public
        </button>
        <button className="btn btn-sm" onClick={() => setFilter('private')}>
          Private
        </button>
        <button className="btn btn-sm" onClick={() => setFilter('flagged')}>
          Flagged
        </button>
      </div>

      {/* Lessons Table */}
      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Access</th>
              <th>Featured</th>
              <th>Reviewed</th>
              <th>Reports</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLessons.map((lesson, i) => (
              <tr key={lesson._id}>
                <td>{i + 1}</td>
                <td>{lesson.title}</td>
                <td>{lesson.authorEmail}</td>
                <td>{lesson.accessLevel}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={lesson.isFeatured}
                    onChange={() =>
                      handleUpdate(lesson, { isFeatured: !lesson.isFeatured })
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={lesson.reviewed || false}
                    onChange={() =>
                      handleUpdate(lesson, { reviewed: !lesson.reviewed })
                    }
                  />
                </td>
                <td>{lesson.reportCount}</td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(lesson)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLessons;
