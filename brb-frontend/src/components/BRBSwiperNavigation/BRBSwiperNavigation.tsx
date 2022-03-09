import React from 'react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.less';
import 'swiper/components/navigation/navigation.less';
import './BRBSwiperNavigation.less';

SwiperCore.use([Navigation]);

export interface Props extends Swiper {
  slides: React.ReactNode[];
}

export const BRBSwiperNavigation = (props: Props) => {
  const { slides } = props;
  return (
    <Swiper
      navigation
      freeMode
      className="BRB-swiper"
      {...props}
    >
      {slides.map((s, i) => (
        <SwiperSlide key={`slide_${i}`}>{s}</SwiperSlide>
      ))}
    </Swiper>
  );
};
