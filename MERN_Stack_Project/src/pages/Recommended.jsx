import React, { useEffect, useState } from 'react';
import { BookCard } from './Book/BookCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import { useFetchAllBooksQuery } from '../redux/booksApi';


const Recommended = () => {
  
  const {data: books = []} = useFetchAllBooksQuery();

  return (
    <div className='py-16'>

      <h2 className='text-3xl font-semibold mb-6'>Recommended for you</h2>

      <Swiper
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Keyboard]}
        className="mySwiper"
        breakpoints={
          {
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1180: {
              slidesPerView: 3,
              spaceBetween: 50,
            }
          }
        }
      >

        {/*displaying the filtered books*/}
        {
          books.length > 0 && books.slice(6, 13).map((book, index) => (
            <SwiperSlide key={index}> <BookCard book={book} /> </SwiperSlide>
          ))
        }


      </Swiper>
    </div>
  )
}

export default Recommended