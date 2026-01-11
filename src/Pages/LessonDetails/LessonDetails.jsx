import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const LessonDetails = () => {
  const lesson = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [comment, setComment] = useState('');

  // views
  const formatview = num => {
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    }
    return num;
  };

  // like
  const formatLikes = num => {
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    }
    return num;
  };

  const [views, setViews] = useState(Math.floor(Math.random() * 10000));

  const [likes, setLikes] = useState(Math.floor(Math.random() * 5000));
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!user) {
      toast.error('Please log in to like');
      return;
    }

    if (liked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }

    setLiked(!liked);
  };

  // Comments

  const { data: comments = [], refetch } = useQuery({
    queryKey: ['comments', lesson._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${lesson._id}`);
      return res.data;
    },
  });

  // Post Comment

  const handleComment = async () => {
    if (!user) {
      toast.error('Please log in to comment');
      return;
    }

    try {
      const res = await axiosSecure.post('/comments', {
        lessonId: lesson._id,
        text: comment,
        userName: user.displayName,
        userPhoto: user.photoURL,
      });

      console.log(res.data);

      refetch();
      setComment('');
      toast.success('Comment posted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to post comment');
    }
  };

  // Related Lessons

  const { data: related = [] } = useQuery({
    queryKey: ['related', lesson._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/related/${lesson._id}`);
      return res.data;
    },
  });

  //save lesson
  const handleSaveLesson = async () => {
    if (!user) {
      toast.error('Please log in to save lessons');
      return;
    }
    const res = await axiosSecure.post('/lessons/save', {
      lessonId: lesson._id,
      userEmail: user.email,
    });

    if (res.data.modifiedCount > 0) {
      toast.success('Lesson saved successfully!');
    } else {
      toast('Already saved');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* IMAGE */}
      {lesson.image && (
        <img
          src={lesson.image}
          className="w-full h-96 object-cover rounded-xl"
        />
      )}

      {/* TITLE */}
      <h1 className="text-3xl font-bold">{lesson.title}</h1>

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
        {lesson.privacy === 'Public' ? (
          <span className="bg-green-100 font-bold text-green-800 text-xs px-2 py-1 rounded">
            Public
          </span>
        ) : (
          <span className="bg-red-100 font-bold text-red-800 text-xs px-2 py-1 rounded">
            Private
          </span>
        )}
      </div>

      {/* DESCRIPTION */}
      <p className="whitespace-pre-line text-lg">{lesson.description}</p>

      {/* AUTHOR */}
      <div className="flex items-center gap-4 bg-base-200 p-4 rounded-xl">
        <img src={lesson.authorPhoto} className="w-14 h-14 rounded-full" />
        <div>
          <h3 className="font-semibold">{lesson.authorName}</h3>
          <p className="text-sm">{lesson.authorEmail}</p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <button className="btn border border-gray-300">
          {' '}
          👀 {formatview(views)}
        </button>
        <button
          onClick={handleLike}
          className={`btn ${
            liked
              ? 'btn-error border border-gray-300 '
              : 'border border-gray-300'
          }`}
        >
          ❤️ {liked ? 'Liked' : 'Like'} {formatLikes(likes)}
        </button>
        <button
          onClick={handleSaveLesson}
          className="btn border border-gray-300"
        >
          🔖 Save
        </button>
        <button className="btn border border-gray-300">🚩 Report</button>
      </div>

      {/* COMMENTS */}
      <div>
        <h3 className="font-bold text-xl mb-3">Comments</h3>
        {user && (
          <div className="flex gap-2 mb-4">
            <input
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Write a comment..."
            />
            <button
              onClick={() => handleComment()}
              className="btn btn-primary  text-black"
            >
              Post
            </button>
          </div>
        )}

        {comments.map(c => (
          <div key={c._id} className="flex gap-3 mb-3">
            <img src={c.userPhoto} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">{c.userName}</p>
              <p>{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RELATED */}
      <div>
        <h3 className="font-bold text-xl mb-4">Related Lessons</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {related.map(r => (
            <div key={r._id} className="card bg-base-200 shadow-md">
              <figure className="h-40 overflow-hidden">
                <img src={r.image} />
              </figure>
              <div className="card-body">
                <h4 className="font-semibold">{r.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
