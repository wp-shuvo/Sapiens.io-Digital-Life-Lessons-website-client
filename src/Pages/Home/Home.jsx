import React from 'react';
import Banner from './Banner/Banner';
import WhyLifeMatters from './WhyLifeMatters/WhyLifeMatters';
import FeaturedLessons from './FeaturedLessons/FeaturedLessons';

const Home = () => {
  return (
    <div>
      <div className="mb-10">
        <Banner />
      </div>
      <div className="mb-10 max-w-7xl mx-auto">
        <FeaturedLessons />
      </div>
      <div>
        <WhyLifeMatters />
      </div>
    </div>
  );
};

export default Home;
