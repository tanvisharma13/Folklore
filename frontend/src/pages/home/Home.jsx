// Home.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Banner from './Banner'; // ✅ Add this import
import TopSellers from './TopSellers';
import Recommened from './Recommened';
import Audiobooks from './Audiobooks';
import Chatbot from './Chatbot';


const Home = () => {
  const { handleScrollToFooter } = useOutletContext(); // ✅ Get the function from App

  return (
    <>
      <Banner onSubscribeClick={handleScrollToFooter} /> {/* ✅ Use Banner here only */}
      <TopSellers />
      <Recommened />
      <Audiobooks />
      <Chatbot />
      
    </>
  );
};

export default Home;
