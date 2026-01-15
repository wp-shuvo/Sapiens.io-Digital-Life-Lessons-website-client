import React, { useState } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({
        displayName: e.target[0].value,
        photoURL: e.target[1].value,
      });
      toast.success('Profile updated successfully!');
      navigate('/dashboard/profile');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Name
          </label>
          <input
            type="text"
            defaultValue={user?.displayName}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C8E661]"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Photo URL
          </label>
          <input
            type="text"
            defaultValue={user?.photoURL}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C8E661]"
            placeholder="Photo URL"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#C8E661] text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-[#b7d854] transition disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
