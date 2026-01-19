import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loading from '../../../../Components/ErrorPage/Loading';
import Swal from 'sweetalert2';

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedReports, setSelectedReports] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const {
    data: lessons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['reported-lessons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/reported-lessons');
      return res.data;
    },
  });

  const openModal = async id => {
    const res = await axiosSecure.get(`/admin/reported-lessons/${id}`);
    setSelectedReports(res.data);
    setShowModal(true);
  };

  const handleIgnore = id => {
    Swal.fire({
      title: 'Ignore Reports?',
      text: 'All reports for this lesson will be removed.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Ignore',
    }).then(async result => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/admin/reported-lessons/${id}/ignore`);
        refetch();
        Swal.fire('Done!', 'Reports cleared.', 'success');
      }
    });
  };

  const handleDeleteLesson = id => {
    Swal.fire({
      title: 'Delete Lesson?',
      text: 'This lesson will be permanently removed.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
    }).then(async result => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/lessons/${id}`);
        refetch();
        Swal.fire('Deleted!', 'Lesson removed.', 'success');
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold mb-6">Reported Lessons</h2>

      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Lesson Title</th>
              <th className="text-center">Reports</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{lesson.title}</td>
                <td className="text-center">{lesson.reportCount}</td>
                <td>
                  <button
                    onClick={() => openModal(lesson._id)}
                    className="btn btn-xs"
                  >
                    View Reports
                  </button>
                </td>
                <td className="space-x-2 flex gap-2 max-sm:flex-col">
                  <button
                    onClick={() => handleDeleteLesson(lesson._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleIgnore(lesson._id)}
                    className="btn btn-xs btn-warning"
                  >
                    Ignore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Report Details</h3>

            <div className="max-h-80 overflow-y-auto space-y-3">
              {selectedReports.map(r => (
                <div key={r._id} className="border-b pb-2">
                  <p className="text-sm font-semibold">{r.reporterEmail}</p>
                  <p className="text-sm">{r.reason}</p>
                  <p className="text-xs opacity-60">
                    {new Date(r.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedLessons;
