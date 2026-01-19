import React from 'react';
import Banner from './Banner/Banner';
import WhyLifeMatters from './WhyLifeMatters/WhyLifeMatters';
import FeaturedLessons from './FeaturedLessons/FeaturedLessons';
import TopContributors from './TopContributors/TopContributors';
import MostSavedLessons from './MostSavedLessons/MostSavedLessons';

const Home = () => {
  return (
    <div>
      <div className="mb-10">
        <Banner />
      </div>
      <div className="mb-10 max-w-7xl mx-auto">
        <FeaturedLessons />
      </div>
      <div className="mb-10">
        <WhyLifeMatters />
      </div>
      <div className="mb-10 max-w-7xl mx-auto">
        <TopContributors />
      </div>
      {/* <div className="mb-10 ">
        <MostSavedLessons />
      </div> */}
    </div>
  );
};

export default Home;
