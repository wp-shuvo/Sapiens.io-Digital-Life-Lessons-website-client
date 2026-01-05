import React from 'react';
import { Link } from 'react-router';

// Example blog replace with dynamic data later

const blogPosts = [
  {
    id: 1,
    title: '5 Life Lessons Everyone Should Learn',
    excerpt:
      'Discover essential life lessons that can transform your mindset and help you grow personally and professionally.',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=799&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'The Power of Reflection',
    excerpt:
      'Learn why reflecting on your daily experiences can boost your self-awareness and guide better decisions.',
    image:
      'https://images.unsplash.com/photo-1595522884592-3aff2b4b7400?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'How to Turn Mistakes into Wisdom',
    excerpt:
      'Mistakes are not failures; they’re opportunities to learn. Here’s how to make the most of them.',
    image:
      'https://images.unsplash.com/photo-1517363898874-737b62a7db91?q=80&w=1063&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const Blog = () => {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Blog
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore articles and stories about life lessons, personal growth,
            and self-improvement.
          </p>
        </div>

        {/* Blog */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  to={'/comingSoon'}
                  className="text-[#C8E661] font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
