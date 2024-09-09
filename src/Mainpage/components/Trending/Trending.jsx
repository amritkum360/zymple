import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './Trending.css';

import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

import slide_image_1 from '/mainpage/trending/aadharthumb.webp';
import slide_image_2 from '/mainpage/trending/aadharthumb.webp';
import slide_image_3 from '/mainpage/trending/aadharthumb.webp';
import slide_image_4 from '/mainpage/trending/aadharthumb.webp';
import slide_image_5 from '/mainpage/trending/aadharthumb.webp';
import slide_image_6 from '/mainpage/trending/aadharthumb.webp';
import slide_image_7 from '/mainpage/trending/aadharthumb.webp';

function Trending() {
  return (
    <div className="container">
      <h1 className="heading">Latest Forms</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="swiper_container"
      >
        {[slide_image_1, slide_image_2, slide_image_3, slide_image_4, slide_image_5, slide_image_6, slide_image_7].map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide} alt={`slide_image_${index + 1}`} />
          </SwiperSlide>
        ))}

       
      </Swiper>
    </div>
  );
}

export default Trending;
