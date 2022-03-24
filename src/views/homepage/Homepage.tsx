import React from 'react';
import Footer from '@components/containers/footer/Footer';
import Header from '@components/containers/header/Header';
import LandingContent from '@components/containers/landingContent/LandingContent';
import Slider from '@components/containers/slider/Slider';
import sliderData from '@utils/constants/sliderData';
import cl from './Homepage.module.scss';

const Homepage: React.FC = () => {
  return (
    <main className={cl.main}>
      <section className={cl.content}>
        <Header headerClass={cl.header} />
        <LandingContent />
        <Footer />
      </section>
      <Slider slidesData={sliderData} />
    </main>
  );
};

export default Homepage;
