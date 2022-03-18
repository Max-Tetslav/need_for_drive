import React, { useCallback, useState } from 'react';
import Footer from '@components/containers/footer/Footer';
import Header from '@components/containers/header/Header';
import LandingContent from '@components/containers/landingContent/LandingContent';
import Slider from '@components/containers/slider/Slider';
import MenuBtn from '@components/common/menuBtn/MenuBtn';
import sliderData from '@utils/constants/sliderData';
import cl from './Homepage.module.scss';

const Homepage: React.FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const menuBtnHandler = useCallback(() => {
    setIsMenuOpened(!isMenuOpened);
  }, [isMenuOpened]);

  return (
    <main className={cl.main}>
      <section className={cl.content}>
        <MenuBtn isActive={isMenuOpened} clickHandler={menuBtnHandler} />
        <Header />
        <LandingContent />
        <Footer />
      </section>
      <Slider slidesData={sliderData} />
    </main>
  );
};

export default Homepage;
