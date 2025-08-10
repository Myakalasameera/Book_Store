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

const categories = ["Choose a genre", "Adventure", "Horror", "Fiction", "Business"];

const TopSellers = () => {
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre")

    const {data: books = []} = useFetchAllBooksQuery();
    //console.log(books);

    const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase());

    //console.log(filteredBooks);

    return (
        <div className='py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
            {/*category filtering*/}
            <div className='mb-8 flex items-center'>
                <select onChange={(e) => setSelectedCategory(e.target.value)} name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>))
                    }
                </select>
            </div>

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
                filteredBooks.map((book, index) => (
                    <SwiperSlide key={index}> <BookCard book={book} /> </SwiperSlide>
                ))
                }
                
                
            </Swiper>

        </div>
    )
}

export default TopSellers;