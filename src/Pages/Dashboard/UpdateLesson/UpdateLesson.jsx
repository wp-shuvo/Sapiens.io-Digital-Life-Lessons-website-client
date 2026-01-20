import React, { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import useIsPremium from '../../../Hooks/useIsPremium';
import toast from 'react-hot-toast';

const UpdateLesson = () => {
  const lesson = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { isPremium } = useIsPremium();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      emotionalTone: '',
      image: '',
      privacy: '',
      accessLevel: '',
    },
  });

  // Pre-fill form when lesson loads
  useEffect(() => {
    if (lesson) {
      reset({
        title: lesson.title,
        description: lesson.description,
        category: lesson.category,
        emotionalTone: lesson.emotionalTone,
        image: lesson.image,
        privacy: lesson.privacy,
        accessLevel: lesson.accessLevel,
      });
    }
  }, [lesson, reset]);

  const handleUpdateLesson = async data => {
    try {
      await axiosSecure.patch(`/lessons/${lesson._id}`, data);
      toast.success('Lesson updated successfully!');
      navigate('/dashboard/my-lessons');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update lesson');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">Update Your Lesson</h2>

      <form onSubmit={handleSubmit(handleUpdateLesson)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="label block mb-2 font-medium text-gray-700">
            Lesson Title
          </label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="input input-bordered w-full"
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
          />
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

        {/* Tone */}
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
            Image URL
          </label>
          <input
            {...register('image')}
            className="input input-bordered w-full"
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
              🔒 Upgrade to Premium to change access level
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary text-black w-full"
        >
          {isSubmitting ? 'Updating...' : 'Update Lesson'}
        </button>
      </form>
    </div>
  );
};

export default UpdateLesson;
