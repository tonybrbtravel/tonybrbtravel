import React from 'react';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.less';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import { NavigationOptions } from 'swiper/types/components/navigation.d';
import { Icon } from 'semantic-ui-react';

import './BRBSwiper.less';

SwiperCore.use([Pagination]);

export interface Props extends Swiper {
  slides: React.ReactNode[];
}

export const BRBSwiper = (props: Props) => {
  const { navigation, pagination, slides } = props;
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  return (
    <div className="BRBSwiper">
      {navigation && (
        <Swiper
          keyboard={{ enabled: false, onlyInViewport: false }}
          mousewheel={{ invert: false }}
          spaceBetween={50}
          navigation={
            navigation
              ? {
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }
              : false
          }
          onInit={(swiper: any) => {
            if (swiper.params?.navigation) {
              if (!swiper.params?.loop) (swiper.params.navigation as NavigationOptions).prevEl = navigationPrevRef.current;
              (swiper.params.navigation as NavigationOptions).nextEl = navigationNextRef.current;
            }
            swiper.navigation?.update();
          }}
          pagination={pagination || { clickable: true }}
          allowTouchMove={false}
          className="BRB-swiper"
          {...props}
        >
          <>
            <div
              ref={navigationPrevRef}
              className="brb-swiper__nav brb-swiper__nav--prev"
            >
              <Icon name="arrow circle left" size="big" />
            </div>
            <div
              ref={navigationNextRef}
              className="brb-swiper__nav brb-swiper__nav--next"
            >
              <Icon name="arrow circle right" size="big" />
            </div>
          </>
          {slides.map((s, i) => (
            <SwiperSlide key={`slide_${i}`}>{s}</SwiperSlide>
          ))}
        </Swiper>
      )}
      {pagination && (
        <Swiper
          keyboard={{ enabled: false, onlyInViewport: false }}
          mousewheel={{ invert: false }}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          allowTouchMove={false}
          className="BRB-swiper"
          {...props}
        >
          {slides.map((s, i) => (
            <SwiperSlide key={`slide_${i}`}>{s}</SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
