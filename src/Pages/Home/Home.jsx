import React from 'react';
import Banner from './Banner/Banner';
import WhyLifeMatters from './WhyLifeMatters/WhyLifeMatters';

const Home = () => {
  return (
    <div>
      <div className="mb-10">
        <Banner />
      </div>
      <div>
        <WhyLifeMatters />
      </div>
    </div>
  );
};

export default Home;
