import React from 'react';

const ContactUs = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Contact Us
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Have a question, suggestion, or life lesson to share? We’d love to
            hear from you.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-10 md:grid-cols-2 bg-white rounded-2xl shadow-sm p-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Get in Touch
            </h2>

            <p className="text-gray-600">
              Reach out to us anytime. We usually respond within 24 hours.
            </p>

            <div className="space-y-4 text-gray-700">
              <p>
                <span className="font-semibold">📧 Email:</span>{' '}
                support@Sapiens.io.com
              </p>
              <p>
                <span className="font-semibold">📞 Phone:</span> +880 1234 567
                890
              </p>
              <p>
                <span className="font-semibold">📍 Location:</span> Dhaka,
                Bangladesh
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C8E661]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C8E661]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C8E661]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C8E661] text-gray-900 font-semibold py-3 rounded-xl hover:bg-[#b7d854] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
