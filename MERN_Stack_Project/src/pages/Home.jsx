import React from 'react';
import Banner from './Banner';
import TopSellers from './TopSellers';
import Recommended from './Recommended';
import News from './News';
import ChatBot from '../components/ChatBot';

const Home = () => {
    return (
        <>
            <Banner/>
            <TopSellers/>
            <Recommended/>
            <News/>
            <ChatBot />
        </>
    )
}

export default Home;
