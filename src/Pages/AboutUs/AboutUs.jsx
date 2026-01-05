import React from 'react';
import Lottie from 'lottie-react';
import aboutUsAnimation from '../../assets/aboutUs/Get in touch with us  Online managers.json';

const AboutUs = () => {
  return (
    <section className="relative min-h-screen py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 z-10 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            About Digital Life Lessons
          </h1>

          <p className="text-gray-700 text-lg">
            Digital Life Lessons is a platform where people can create, store,
            and share meaningful lessons they've learned through life
            experiences. Our mission is to empower personal growth, resilience,
            and wisdom-sharing across the globe.
          </p>

          <p className="text-gray-700 text-lg">
            Whether it’s a small insight or a major life-changing experience,
            our platform allows users to reflect, inspire, and learn from
            others’ journeys.
          </p>

          <div className="flex gap-4 mt-6">
            <a
              href="/contact"
              className="px-6 py-3 bg-[#C8E661] text-gray-900 font-semibold rounded-xl hover:bg-[#b7d854] transition"
            >
              Contact Us
            </a>
            <a
              href="/public-lessons"
              className="px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Explore Lessons
            </a>
          </div>
        </div>

        {/* Image / Placeholder */}
        <div className="relative z-10">
          <Lottie
            animationData={aboutUsAnimation}
            loop={true}
            autoplay={true}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
