import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useIsPremium from '../../../Hooks/useisPremium';
import toast from 'react-hot-toast';

const Addlesson = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPremium } = useIsPremium();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async data => {
    const lessonData = {
      ...data,
      accessLevel: isPremium ? data.accessLevel : 'Free',
      authorName: user?.displayName,
      authorEmail: user?.email,
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post('/lessons', lessonData);
      toast.success('🎉 Lesson created successfully!');
      reset();
    } catch (error) {
      console.error('Error lesson>>>>>', error);
      toast.error('Failed to create lesson');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">Create New Life Lesson</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Lesson Title */}
        <div>
          <label className="label block mb-2 font-medium text-gray-700">
            Lesson Title
          </label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="input input-bordered w-full"
            placeholder="Enter lesson title"
          />
          {errors.title && (
            <p className="text-error text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="label block mb-2 font-medium text-gray-700">
            Full Description / Story / Insight
          </label>
          <textarea
            {...register('description', {
              required: 'Description is required',
            })}
            rows={5}
            className="textarea textarea-bordered w-full"
            placeholder="Write your life lesson..."
          />
          {errors.description && (
            <p className="text-error text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="label block mb-2 font-medium text-gray-700">
            Category
          </label>
          <select
            {...register('category')}
            className="select select-bordered w-full"
          >
            <option>Personal Growth</option>
            <option>Career</option>
            <option>Relationships</option>
            <option>Mindset</option>
            <option>Mistakes Learned</option>
          </select>
        </div>

        {/* Emotional Tone */}
        <div>
          <label className="label block mb-2 font-medium text-gray-700">
            Emotional Tone
          </label>
          <select
            {...register('emotionalTone')}
            className="select select-bordered w-full"
          >
            <option>Motivational</option>
            <option>Sad</option>
            <option>Realization</option>
            <option>Gratitude</option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="label block mb-2 font-medium text-gray-700">
            Image (Optional)
          </label>
          <input
            {...register('image')}
            type="url"
            className="input input-bordered w-full"
            placeholder="Image URL"
          />
        </div>

        {/* Privacy */}
        <div>
          <label className="label block mb-2 font-medium text-gray-700">
            Privacy
          </label>
          <select
            {...register('privacy')}
            className="select select-bordered w-full"
          >
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>

        {/* Access Level */}
        <div>
          <label className="label block mb-2 font-medium text-gray-700">
            Access Level
          </label>

          <select
            {...register('accessLevel')}
            disabled={!isPremium}
            className="select select-bordered w-full disabled:cursor-not-allowed"
          >
            <option>Free</option>
            <option>Premium</option>
          </select>

          {!isPremium && (
            <p className="text-warning text-sm mt-1">
              🔒 Upgrade to Premium to create paid lessons
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary text-black w-full"
        >
          {isSubmitting ? 'Publishing...' : 'Publish Lesson'}
        </button>
      </form>
    </div>
  );
};

export default Addlesson;
