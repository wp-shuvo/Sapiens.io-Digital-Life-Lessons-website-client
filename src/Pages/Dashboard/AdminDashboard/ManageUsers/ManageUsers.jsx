import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { FaTrash, FaUserFriends, FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Loading from '../../../../Components/ErrorPage/Loading';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const axiousSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await axiousSecure.get('/users');
      return res.data;
    },
  });

  console.log(users);

  //make admin

  const handleMakeAdmin = user => {
    const roleInfo = { role: 'admin' };

    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want To Make ' + user.displayName + ' Admin',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Make Admin',
    }).then(async result => {
      if (result.isConfirmed) {
        await axiousSecure
          .patch(`/admin/users/${user._id}/role`, roleInfo)
          .then(res => {
            // console.log(res.data);
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: 'Confirmed!',
                text: `${user.displayName} has been made admin successfully`,
                icon: 'success',
              });
            }
          });
      }
    });
  };

  //remove admin
  const handleMakeUser = user => {
    const roleInfo = { role: 'user' };

    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want To Make ' + user.displayName + ' User Again',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Make User',
    }).then(async result => {
      if (result.isConfirmed) {
        await axiousSecure
          .patch(`/admin/users/${user._id}/role`, roleInfo)
          .then(res => {
            // console.log(res.data);
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: 'Confirmed!',
                text: `${user.displayName} has been made user successfully`,
                icon: 'success',
              });
            }
          });
      }
    });
  };

  //delete user

  const handleDelete = user => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You Want To Delete ${user.displayName} Permanently`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete',
    }).then(async result => {
      if (result.isConfirmed) {
        await axiousSecure.delete(`/admin/users/${user._id}`).then(res => {
          // console.log(res.data);
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: 'Confirmed!',
              text: `${user.displayName} has been deleted successfully`,
              icon: 'success',
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold mb-6">Manage Users</h2>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center p-4 w-full bg-gray-200 rounded-lg">
          <div className="p-3 bg-gray-300 rounded-full shadow mr-4">
            <FaUserFriends className="text-gray-600 w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-500 font-medium">
              Total Users
            </p>
            <p className="text-base md:text-lg font-bold text-gray-800">
              {users.length}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>User</th>
              <th className="hidden md:table-cell">Email</th>
              <th className="hidden lg:table-cell">Total Lessons</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-9 w-9 md:h-12 md:w-12">
                        <img src={user.photoURL} alt={user.displayName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-sm md:text-base">
                        {user.displayName}
                      </div>
                      <div className="text-sm opacity-50">{user.role}</div>
                      <div className="text-xs opacity-50 md:hidden">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="hidden md:table-cell">{user.email}</td>
                <td className="hidden lg:table-cell">{user.lessonCount}</td>

                <td>
                  {user.role === 'admin' ? (
                    <button
                      onClick={() => handleMakeUser(user)}
                      className="btn btn-xs md:btn-sm bg-red-300"
                    >
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-xs md:btn-sm bg-primary text-black"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-xs md:btn-sm bg-red-400"
                  >
                    <FaTrash />
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

export default ManageUsers;
