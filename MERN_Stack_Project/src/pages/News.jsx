import React from 'react';
import { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { NewsCard } from './News/NewsCard';

const News = () => {

    const [news, setNews] = useState([]);
    useEffect(() => {
            fetch('news.json').then(res => res.json()).then((data) => setNews(data));
        }, [])

  return (
    <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6'>News</h2>
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={ {
          640: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50
          }
        } }
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        
        {
          news.length > 0 && news.map((newsPiece, index) => (
            <SwiperSlide key={index}><NewsCard newsPiece={newsPiece} /></SwiperSlide>
          ))
        }

      </Swiper>
    </div>
  )
}

export default News