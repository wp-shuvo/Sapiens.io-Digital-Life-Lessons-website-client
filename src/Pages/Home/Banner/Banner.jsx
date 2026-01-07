import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

import bannerImg1 from '../../../assets/assetsImage/sliderimage1.jpeg';
import bannerImg2 from '../../../assets/assetsImage/sliderimage2.jpeg';
import bannerImg3 from '../../../assets/assetsImage/sliderimage3.jpeg';
import bannerImg4 from '../../../assets/assetsImage/sliderimage4.jpeg';
import bannerImg5 from '../../../assets/assetsImage/sliderimage5.jpeg';

const Banner = () => {
  const slides = [bannerImg1, bannerImg2, bannerImg3, bannerImg4, bannerImg5];

  const [text] = useTypewriter({
    words: [
      'Learn from Real Life Experiences',
      'Share Wisdom That Matters',
      'Grow with Meaningful Life Lessons',
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* IMAGE SLIDER ONLY */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        interval={4000}
      >
        {slides.map((img, i) => (
          <div key={i}>
            <img src={img} alt="" className="w-full h-[80vh] object-cover" />
          </div>
        ))}
      </Carousel>

      {/* STATIC TEXT */}
      <div className="absolute inset-0 bg-black/40 flex items-center z-10">
        <div className="max-w-4xl px-6 md:px-20 text-white space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Digital Life Lessons
          </h1>

          <h2 className="text-xl md:text-3xl font-semibold text-[#C8E661]">
            {text}
            <Cursor cursorColor="#C8E661" />
          </h2>

          <p className="max-w-xl text-gray-200">
            Discover, create, and share life lessons that inspire growth,
            resilience, and self-improvement.
          </p>

          <div className="flex gap-4 pt-4">
            <Link
              to="/publicLessons"
              className="bg-[#C8E661] text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-[#b7d854] transition"
            >
              Explore Public Lessons
            </Link>

            <Link
              to="/dashboard/add-lesson"
              className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition"
            >
              Share Your Lesson
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
