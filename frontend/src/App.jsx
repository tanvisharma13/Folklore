// App.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvide } from './context/AuthContext';
import Loading from './components/Loading';

// ✅ Import Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loading, setLoading] = useState(true);
  const footerRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToFooter = () => {
    footerRef.current?.scrollToInputAndHighlight();
  };

  if (loading) return <Loading />;

  return (
    <>
      <AuthProvide>
        <Navbar />
        <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary bg-[#FDFCF1]'>
          <Outlet context={{ handleScrollToFooter }} />
        </main>
        <Footer ref={footerRef} />
        {/* ✅ Toast container goes here */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </AuthProvide>
    </>
  );
}

export default App;
